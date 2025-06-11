import type { Request, Response } from 'express';

import express from 'express';
import type { Router } from 'express';
import { Controller } from './controller';
import { expressControllerHandler } from '../../lib/express-api.helpers';
import { userAuthMiddleware } from '../../middlewares/auth.middleware';

export function register(): Router {
  const router: Router = express.Router();
  const controller = new Controller();

  router.post(
    '/register',
    expressControllerHandler(controller.register.bind(controller))
  );
  router.post(
    '/login',
    expressControllerHandler(controller.login.bind(controller))
  );

  router.get(
    '/profile',
    userAuthMiddleware,
    expressControllerHandler(controller.getProfile.bind(controller))
  );

  router.delete(
    '/logout',
    userAuthMiddleware,
    expressControllerHandler(controller.logout.bind(controller))
  );

  return router;
}
