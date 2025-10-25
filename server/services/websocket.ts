import { Server as HTTPServer } from 'http';
import { WebSocketServer, WebSocket, RawData } from 'ws';

interface Client {
  ws: WebSocket;
  userId: string;
}

export class WebSocketService {
  private wss: WebSocketServer;
  private clients: Map<string, Client> = new Map();

  constructor(server: HTTPServer) {
    this.wss = new WebSocketServer({ server, path: '/ws' });
    this.setupWebSocket();
  }

  private setupWebSocket() {
    this.wss.on('connection', (ws: WebSocket, req) => {
      console.log('New WebSocket connection');
      
      // TODO: SECURITY - Validate session from cookies/headers before accepting connection
      // For now, require auth message with session validation
      let authenticated = false;
      let userId: string | null = null;

      ws.on('message', (data: RawData) => {
        try {
          const message = JSON.parse(data.toString());
          
          // All messages except auth require authentication
          if (message.type !== 'auth' && !authenticated) {
            ws.send(JSON.stringify({ 
              type: 'error', 
              message: 'Not authenticated. Send auth message first.' 
            }));
            return;
          }
          
          this.handleMessage(ws, message, (authUserId) => {
            authenticated = true;
            userId = authUserId;
          });
        } catch (error) {
          console.error('WebSocket message error:', error);
        }
      });

      ws.on('close', () => {
        if (userId) {
          this.removeClientByUserId(userId);
        }
      });

      ws.on('error', (error) => {
        console.error('WebSocket error:', error);
      });
    });
  }

  private handleMessage(ws: WebSocket, message: any, onAuth?: (userId: string) => void) {
    switch (message.type) {
      case 'auth':
        // TODO: CRITICAL - Validate userId against session/JWT token
        // For now, this is a placeholder that MUST be secured before production
        this.handleAuth(ws, message.userId, onAuth);
        break;
      case 'message':
        this.handleChatMessage(message);
        break;
      case 'typing':
        this.handleTyping(message);
        break;
      case 'read':
        this.handleRead(message);
        break;
    }
  }

  private handleAuth(ws: WebSocket, userId: string, onAuth?: (userId: string) => void) {
    // TODO: SECURITY - This needs proper session validation!
    // Currently accepts any userId - INSECURE!
    // Should verify against session cookie or JWT token
    this.clients.set(userId, { ws, userId });
    ws.send(JSON.stringify({ type: 'auth', success: true }));
    if (onAuth) onAuth(userId);
  }

  private removeClientByUserId(userId: string) {
    this.clients.delete(userId);
    console.log(`Client ${userId} disconnected`);
  }

  private handleChatMessage(message: any) {
    const { senderId, receiverId, content } = message;
    const receiver = this.clients.get(receiverId);
    
    if (receiver && receiver.ws.readyState === WebSocket.OPEN) {
      receiver.ws.send(JSON.stringify({
        type: 'message',
        senderId,
        content,
        timestamp: new Date(),
      }));
    }
  }

  private handleTyping(message: any) {
    const { senderId, receiverId, isTyping } = message;
    const receiver = this.clients.get(receiverId);
    
    if (receiver && receiver.ws.readyState === WebSocket.OPEN) {
      receiver.ws.send(JSON.stringify({
        type: 'typing',
        senderId,
        isTyping,
      }));
    }
  }

  private handleRead(message: any) {
    const { senderId, receiverId, messageId } = message;
    const sender = this.clients.get(senderId);
    
    if (sender && sender.ws.readyState === WebSocket.OPEN) {
      sender.ws.send(JSON.stringify({
        type: 'read',
        messageId,
        readBy: receiverId,
      }));
    }
  }

  private removeClient(ws: WebSocket) {
    for (const [userId, client] of this.clients.entries()) {
      if (client.ws === ws) {
        this.clients.delete(userId);
        console.log(`Client ${userId} disconnected`);
        break;
      }
    }
  }

  // Public methods to send notifications
  public sendNotification(userId: string, notification: any) {
    const client = this.clients.get(userId);
    if (client && client.ws.readyState === WebSocket.OPEN) {
      client.ws.send(JSON.stringify({
        type: 'notification',
        data: notification,
      }));
    }
  }

  public broadcastToRole(role: string, message: any) {
    // TODO: Implement role-based broadcasting
  }
}

let wsService: WebSocketService | null = null;

export function initializeWebSocket(server: HTTPServer): WebSocketService {
  wsService = new WebSocketService(server);
  return wsService;
}

export function getWebSocketService(): WebSocketService | null {
  return wsService;
}
