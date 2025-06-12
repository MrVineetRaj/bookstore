import type { NextFunction, Request, Response } from 'express';
import { decodeToken, extractToken } from '../lib/auth.helpers';
import { prisma } from '../lib/db';
import logger from '../../logger';
import { ApiError } from '../lib/express-api.helpers';
import { UserRole } from '../../generated/prisma';
import { extractApiKey, isValidApiKey } from '../lib/api-key.helpers';

export async function apiKeyMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const keys = extractApiKey(req);
  if (!keys) {
    throw new ApiError(401, 'Api key is invalid');
  }

  const storeId = req.params.storeId;
  console.log('keys', storeId);
  const apiKey = await prisma.apiKey.findUnique({
    where: {
      seller_id: req.user.id,
      pub_key: keys.pubKey,
      store_id: storeId,
    },
  });

  console.log('apiKey', apiKey);

  if (!apiKey) {
    throw new ApiError(401, 'Api key is invalid');
  }

  const isValid = isValidApiKey(
    keys?.pubKey,
    keys?.privateKey,
    apiKey?.priv_key || ''
  );

  if (!isValid) {
    throw new ApiError(401, 'Api key is invalid');
  }

  next();
}
