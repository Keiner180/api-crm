import express, { Express, Request, Response, NextFunction } from 'express';
import { JsonDatabase } from './db.js';
import { methodNotAllowedMiddleware } from './middleware/methods.js';
import { createAuthMiddleware } from './middleware/auth.js';
import { createHealthRouter } from './routes/health.js';
import { createDebtorsRouter } from './routes/debtors.js';

export function createApp(db?: JsonDatabase): Express {
  const app = express();
  const database = db || new JsonDatabase();

  app.use(express.json());

  // Check HTTP method (GET only, otherwise 405)
  app.use(methodNotAllowedMiddleware);

  // Health endpoint (public)
  app.use('/api', createHealthRouter());

  // Authenticated v1 endpoints
  const authMiddleware = createAuthMiddleware(database);
  app.use('/api/v1', authMiddleware, createDebtorsRouter(database));

  // 404 Handler
  app.use((_req: Request, res: Response) => {
    res.status(404).json({
      error: {
        code: 'NOT_FOUND',
        message: 'Route not found.',
      },
    });
  });

  // Global Error Handler
  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    console.error('Unhandled server error:', err);
    res.status(500).json({
      error: {
        code: 'INTERNAL',
        message: 'Internal server error.',
      },
    });
  });

  return app;
}
