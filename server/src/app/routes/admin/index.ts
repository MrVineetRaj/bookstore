import express from 'express';
import type { Router } from 'express';
import { Controller } from './controller';
import { expressControllerHandler } from '../../lib/express-api.helpers';
import { sellerAuthMiddleware } from '../../middlewares/auth.middleware';

export function register(): Router {
  const router: Router = express.Router();
  const controller = new Controller();

  router.post(
    '/seed',
    sellerAuthMiddleware,
    expressControllerHandler(controller.seedData.bind(controller))
  );

  return router;
}
