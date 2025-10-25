import type { Express } from "express";
import { upload, getFileUrl } from "./services/fileUpload";
import { requireAuth } from "./middleware/auth";
import { asyncHandler } from "./middleware/errorHandler";

export function registerUploadRoutes(app: Express) {
  // Single file upload
  app.post("/api/upload/single", requireAuth, upload.single('file'), asyncHandler(async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const fileUrl = getFileUrl(req.file.filename);
    res.json({
      success: true,
      file: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        url: fileUrl,
        size: req.file.size,
        mimetype: req.file.mimetype,
      },
    });
  }));

  // Multiple files upload
  app.post("/api/upload/multiple", requireAuth, upload.array('files', 5), asyncHandler(async (req, res) => {
    if (!req.files || !Array.isArray(req.files)) {
      return res.status(400).json({ error: 'No files uploaded' });
    }
    
    const files = req.files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      url: getFileUrl(file.filename),
      size: file.size,
      mimetype: file.mimetype,
    }));

    res.json({
      success: true,
      files,
    });
  }));

  // Serve uploaded files (configured in main server)
}
