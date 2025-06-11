import express from 'express';
import type { Router } from 'express';
import { Controller } from './controller';
import { expressControllerHandler } from '../../lib/express-api.helpers';
import { sellerAuthMiddleware } from '../../middlewares/auth.middleware';

export function register(): Router {
  const router: Router = express.Router();
  const controller = new Controller();

  router.post(
    '/create',
    sellerAuthMiddleware,
    expressControllerHandler(controller.createStore.bind(controller))
  );

  router.get(
    '/get',
    sellerAuthMiddleware,
    expressControllerHandler(controller.getAllStores.bind(controller))
  );

  router.get(
    '/get/:storeId',
    sellerAuthMiddleware,
    expressControllerHandler(controller.getStore.bind(controller))
  );
  router.put(
    '/',
    sellerAuthMiddleware,
    expressControllerHandler(controller.updateStore.bind(controller))
  );
  router.delete(
    '/',
    sellerAuthMiddleware,
    expressControllerHandler(controller.deleteStore.bind(controller))
  );

  return router;
}
