import express from 'express';
import type { Router } from 'express';
import { Controller } from './controller';
import { expressControllerHandler } from '../../lib/express-api.helpers';
import { sellerAuthMiddleware } from '../../middlewares/auth.middleware';
import { apiKeyMiddleware } from '../../middlewares/api-key.middleware';

export function register(): Router {
  const router: Router = express.Router();
  const controller = new Controller();

  router.post(
    '/:storedId/:bookId/',
    sellerAuthMiddleware,
    expressControllerHandler(controller.addOrUpdateReview.bind(controller))
  );

  router.delete(
    '/:storedId/:bookId/delete',
    sellerAuthMiddleware,
    expressControllerHandler(controller.deleteReview.bind(controller))
  );

  return router;
}
