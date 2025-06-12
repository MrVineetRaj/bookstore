import express from 'express';
import cors from 'cors';
import type { Application, NextFunction, Request, Response } from 'express';

import { register as registerAuthRoutes } from './routes/auth';
import { register as registerApiKeyRoutes } from './routes/api-key';
import { register as registerBookRoutes } from './routes/books';
import { register as registerStoreRoutes } from './routes/store';
import { register as registerCartRoutes } from './routes/cart';
import { register as registerReviewRoutes } from './routes/reviews';
import cookieParser from 'cookie-parser';
import { CorsOptions } from './lib/constants';
import { ApiError } from './lib/express-api.helpers';
import logger from '../logger';

export function createApp(): Application {
  const app = express();

  // Middleware to parse JSON bodies
  app.use(express.json());

  // Middleware to parse URL-encoded bodies
  app.use(express.urlencoded({ extended: true }));

  // middleware to handle cookies
  app.use(cookieParser());

  app.use(cors(CorsOptions));
  // Health check route
  app.get('/api/v1/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  app.use('/api/v1/auth', registerAuthRoutes());
  app.use('/api/v1/api-key', registerApiKeyRoutes());
  app.use('/api/v1/store', registerStoreRoutes());
  app.use('/api/v1/book', registerBookRoutes());
  app.use('/api/v1/cart', registerCartRoutes());
  app.use('/api/v1/review', registerReviewRoutes());

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    // console.error('Server error:', err);

    if (err instanceof ApiError) {
      res.status(err.statusCode).json({
        success: err.success,
        statusCode: err.statusCode,
        message: err.message,
        details: err.details,
      });
      return;
    }

    logger.error(err);
    // Default to 500 for unknown errors
    res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error',
      data: null,
    });
    return;
  });
  // Optional: handle 404 for unmatched routes
  // Optional: fallback for unmatched routes
  // app.use('*', (req, res) => {
  //   res.status(404).json({ error: 'Not found' });
  // });
  return app;
}
