import express from 'express';
import type { Application } from 'express';
import { register as registerAuthRoutes } from './routes/auth';
import { register as registerApiKeyRoutes } from './routes/api-key';
import cookieParser from 'cookie-parser';
export function createApp(): Application {
  const app = express();

  // Middleware to parse JSON bodies
  app.use(express.json());

  // Middleware to parse URL-encoded bodies
  app.use(express.urlencoded({ extended: true }));

  // middleware to handle cookies
  app.use(cookieParser());

  // Health check route
  app.get('/api/v1/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
  });
  app.use('/api/v1/auth', registerAuthRoutes());
  app.use('/api/v1/api-key', registerApiKeyRoutes());

  return app;
}
