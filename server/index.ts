import express, { type Request, Response, NextFunction } from "express";
import session from "express-session";
import createMemoryStore from "memorystore";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import { registerRoutes } from "./routes";
import { registerExtendedRoutes } from "./routes-extended";
import { registerUploadRoutes } from "./routes-upload";
import { registerVideoRoutes } from "./routes-video";
import { setupVite, serveStatic, log } from "./vite";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import { storage } from "./storage";
import { registerGamificationRoutes } from "./routes-gamification";

const app = express();
const MemoryStore = createMemoryStore(session);

declare module 'http' {
  interface IncomingMessage {
    rawBody: unknown
  }
}

// Session configuration with memorystore
app.use(session({
  secret: process.env.SESSION_SECRET || 'yeesp-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  store: new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  }),
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    path: '/'
  },
  name: 'yeesp.sid'
}));

// Passport configuration
passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return done(null, false, { message: 'Invalid credentials' });
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return done(null, false, { message: 'Invalid credentials' });
      }

      // Get approved roles
      const approvedRoles = await storage.getUserApprovedRoles(user.id);
      const { password: _, ...userWithoutPassword } = user;

      return done(null, { ...userWithoutPassword, approvedRoles });
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await storage.getUser(id);
    if (!user) {
      return done(null, false);
    }
    const approvedRoles = await storage.getUserApprovedRoles(user.id);
    const { password: _, ...userWithoutPassword } = user;
    done(null, { ...userWithoutPassword, approvedRoles });
  } catch (error) {
    done(error);
  }
});

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static('public/uploads'));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);
  registerExtendedRoutes(app);
  registerUploadRoutes(app);
  registerVideoRoutes(app);

  // Register admin routes
  const adminRoutes = await import('./routes-admin');
  app.use('/api/admin', adminRoutes.default);

  // Register admin reports routes
  const adminReportsRoutes = await import('./routes-admin-reports');
  app.use('/api/admin/reports', adminReportsRoutes.default);

  // Register Zoom routes
  const zoomRoutes = await import('./routes-zoom');
  app.use('/api/zoom', zoomRoutes.default);

  // Register Stripe routes
  const stripeRoutes = await import('./routes-stripe');
  app.use('/api/stripe', stripeRoutes.default);

  // Register Community routes
  const communityRoutes = await import('./routes-community');
  app.use('/api/community', communityRoutes.default);

  // Initialize WebSocket
  const { initializeWebSocket } = await import('./services/websocket');
  initializeWebSocket(server);

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Register gamification route
  const gamificationRoutes = await import('./routes-gamification');
  app.use('/api/gamification', gamificationRoutes.default);

  // Register learning routes (notes, bookmarks, etc.)
  const learningRoutes = await import('./routes-learning');
  app.use('/api', learningRoutes.default);

  // Register portfolio routes
  const portfolioRoutes = await import('./routes-portfolio');
  app.use('/api', portfolioRoutes.default);

  // Error handling middleware (must be last)
  app.use(notFoundHandler);
  app.use(errorHandler);

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();