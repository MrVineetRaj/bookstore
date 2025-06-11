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
    res.status(401).json(
      new ApiError(401, 'Api key is invalid', {
        details: 'API key is missing or invalid',
      })
    );
    return;
  }

  try {
    const apiKey = await prisma.apiKey.findUnique({
      where: {
        seller_id: req.user.id,
        pub_key: keys.pubKey,
      },
    });

    if (!apiKey) {
      res.status(401).json(
        new ApiError(401, 'Api key is invalid', {
          details: 'API key not found or does not belong to the user',
        })
      );
      return;
    }

    const isValid = isValidApiKey(
      keys?.pubKey,
      keys?.privateKey,
      apiKey?.priv_key || ''
    );
    if (!isValid) {
      res.status(401).json(new ApiError(401, 'Api key is invalid'));
    }

    next();
  } catch (error) {
    logger.error('Error in userAuthMiddleware:', error);
    res.status(500).json(
      new ApiError(500, 'Internal Server Error', {
        details: error instanceof Error ? error.message : 'Unknown error',
      })
    );
  }
}
