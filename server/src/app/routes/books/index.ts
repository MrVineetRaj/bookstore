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
    '/:storeId/add-book',
    sellerAuthMiddleware,
    apiKeyMiddleware,
    expressControllerHandler(controller.addBookToStore.bind(controller))
  );

  router.put(
    '/:storeId/update/:bookId',
    sellerAuthMiddleware,
    apiKeyMiddleware,
    expressControllerHandler(controller.updateBook.bind(controller))
  );

  router.delete(
    '/:storeId/delete/:bookId',
    sellerAuthMiddleware,
    apiKeyMiddleware,
    expressControllerHandler(controller.deleteBookFromStore.bind(controller))
  );
  return router;
}
