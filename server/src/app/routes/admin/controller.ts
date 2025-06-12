import crypto from 'crypto';
import type { Request, Response } from 'express';
import { ApiError, ApiResponse } from '../../lib/express-api.helpers';
import { prisma } from '../../lib/db';

export class Controller {
  public seedData = async (req: Request, res: Response): Promise<void> => {
    const { storeName, description } = req.body;
    const existingStore = await prisma.store.findUnique({
      where: {
        owner_id_name: {
          // Prisma generates this field name
          owner_id: req.user?.id,
          name: storeName,
        },
      },
    });

    if (existingStore) {
      res.status(400).json(
        new ApiError(400, 'Store already exists', {
          storeName,
          description: 'Please choose a different store name.',
        })
      );
      return;
    }

    const newStore = await prisma.store.create({
      data: {
        name: storeName,
        description,
        owner_id: req.user?.id,
      },
    });
    res.status(201).json(
      new ApiResponse(201, 'Store created successfully', {
        id: newStore.id,
        name: newStore.name,
        description: newStore.description,
      })
    );
  };
}
