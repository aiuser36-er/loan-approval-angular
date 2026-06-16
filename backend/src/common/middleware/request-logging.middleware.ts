import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger(RequestLoggingMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - start;
      const method = req.method;
      const path = req.path;
      const statusCode = res.statusCode;

      const logMessage = `${method} ${path} - ${statusCode} - ${duration}ms`;

      if (statusCode >= 200 && statusCode < 300) {
        this.logger.log(logMessage);
      } else if (statusCode >= 400 && statusCode < 500) {
        this.logger.warn(logMessage);
      } else if (statusCode >= 500) {
        this.logger.error(logMessage);
      }
    });

    next();
  }
}
