import { Request, Response, NextFunction } from 'express';

export function methodNotAllowedMiddleware(req: Request, res: Response, next: NextFunction): void {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.status(405).json({
      error: {
        code: 'METHOD_NOT_ALLOWED',
        message: 'Method not allowed. This API is read-only; only GET requests are supported.',
      },
    });
    return;
  }
  next();
}
