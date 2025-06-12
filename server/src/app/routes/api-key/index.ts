import type { Request, Response } from 'express';

import express from 'express';
import type { Router } from 'express';
import { Controller } from './controller';
import { expressControllerHandler } from '../../lib/express-api.helpers';
import {
  sellerAuthMiddleware,
  userAuthMiddleware,
} from '../../middlewares/auth.middleware';

export function register(): Router {
  const router: Router = express.Router();
  const controller = new Controller();

  router.post(
    '/:storeId/generate',
    sellerAuthMiddleware,
    expressControllerHandler(controller.generateKey.bind(controller))
  );

  router.post(
    '/:storeId/rotate/:apiKeyId',
    sellerAuthMiddleware,
    expressControllerHandler(controller.rotateKey.bind(controller))
  );

  router.delete(
    '/:storeId/delete/:apiKeyId',
    sellerAuthMiddleware,
    expressControllerHandler(controller.deleteKey.bind(controller))
  );
  router.get(
    '/',
    sellerAuthMiddleware,
    expressControllerHandler(controller.getApiKeys.bind(controller))
  );

  return router;
}
