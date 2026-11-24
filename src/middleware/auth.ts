import { Request, Response, NextFunction } from 'express';
import { Agent } from '../types.js';
import { JsonDatabase } from '../db.js';

declare global {
  namespace Express {
    interface Request {
      agent?: Agent;
    }
  }
}

export function createAuthMiddleware(db: JsonDatabase) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({
        error: {
          code: 'UNAUTHORIZED',
          message: 'Missing Authorization header. Format: Bearer <token>',
        },
      });
      return;
    }

    const match = authHeader.match(/^Bearer\s+(.+)$/);
    if (!match) {
      res.status(401).json({
        error: {
          code: 'UNAUTHORIZED',
          message: 'Invalid Authorization header format. Format must be: Bearer <token>',
        },
      });
      return;
    }

    const token = match[1].trim();
    const agent = db.getAgentByToken(token);

    if (!agent) {
      res.status(401).json({
        error: {
          code: 'UNAUTHORIZED',
          message: 'Invalid or unknown agent token.',
        },
      });
      return;
    }

    req.agent = agent;
    next();
  };
}
