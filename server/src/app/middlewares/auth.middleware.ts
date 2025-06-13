import type { NextFunction, Request, Response } from 'express';
import { decodeToken, extractToken } from '../lib/auth.helpers';
import { prisma } from '../lib/db';
import logger from '../../logger';
import { ApiError } from '../lib/express-api.helpers';
import { UserRole } from '../../generated/prisma';

export async function userAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const token = extractToken(req);
  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const decoded = decodeToken(token);

  if (!decoded.id) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: decoded?.id!, // Assuming decoded contains an id field
      },
      select: {
        id: true, // Exclude password from the user object
        name: true,
        email: true,
        role: true,
        is_email_verified: true,
        created_at: true,
      },
    });

    if (!user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    req.user = user; // Assuming req.user is defined in your types
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

export async function sellerAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const token = extractToken(req);
  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const decoded = decodeToken(token);

  if (!decoded.id) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: decoded?.id!, // Assuming decoded contains an id field
      },
      select: {
        id: true, // Exclude password from the user object
        name: true,
        email: true,
        role: true,
        is_email_verified: true,
        created_at: true,
      },
    });

    if (!user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    if (user.role !== UserRole.SELLER) {
      res.status(403).json({ error: 'Forbidden: Seller access required' });
      return;
    }

    req.user = user; // Assuming req.user is defined in your types
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

export async function adminAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const token = extractToken(req);
  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const decoded = decodeToken(token);

  if (!decoded.id) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: decoded?.id!, // Assuming decoded contains an id field
      },
      select: {
        id: true, // Exclude password from the user object
        name: true,
        email: true,
        role: true,
        is_email_verified: true,
        created_at: true,
      },
    });

    if (!user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    if (user.role !== UserRole.ADMIN) {
      res.status(403).json({ error: 'Forbidden: Admin access required' });
      return;
    }

    req.user = user; // Assuming req.user is defined in your types
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
