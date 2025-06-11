import crypto from 'crypto';
import type { Request, Response } from 'express';
import { ApiError, ApiResponse } from '../../lib/express-api.helpers';
import { prisma } from '../../lib/db';

export class Controller {
  public createStore = async (req: Request, res: Response): Promise<void> => {
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

  public getStore = async (req: Request, res: Response): Promise<void> => {
    const storeId = req.params.storeId;
    const store = await prisma.store.findUnique({
      where: {
        id: storeId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        owner_id: true,
      },
    });

    if (!store) {
      res.status(404).json(new ApiError(404, 'Store not found'));
      return;
    }

    res
      .status(200)
      .json(new ApiResponse(200, 'Store fetched successfully', store));
  };

  public getAllStores = async (req: Request, res: Response): Promise<void> => {
    const stores = await prisma.store.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        owner_id: true,
      },
    });
    res
      .status(200)
      .json(new ApiResponse(200, 'Stores fetched successfully', stores));
  };

  public deleteStore = async (req: Request, res: Response): Promise<void> => {
    const storeId = req.params.storeId;
    const store = await prisma.store.findUnique({
      where: {
        id: storeId,
      },
    });

    if (!store) {
      res.status(404).json(new ApiError(404, 'Store not found'));
      return;
    }

    if (store.owner_id !== req.user?.id) {
      res.status(403).json(new ApiError(403, 'Forbidden'));
      return;
    }

    await prisma.store.delete({
      where: {
        id: storeId,
      },
    });

    res.status(200).json(new ApiResponse(200, 'Store deleted successfully'));
  };

  public updateStore = async (req: Request, res: Response): Promise<void> => {
    const storeId = req.params.storeId;
    const { storeName, description } = req.body;

    const store = await prisma.store.findUnique({
      where: {
        id: storeId,
      },
    });

    if (!store) {
      res.status(404).json(new ApiError(404, 'Store not found'));
      return;
    }

    if (store.owner_id !== req.user?.id) {
      res.status(403).json(new ApiError(403, 'Forbidden'));
      return;
    }

    const updatedStore = await prisma.store.update({
      where: {
        id: storeId,
      },
      data: {
        name: storeName,
        description,
      },
    });

    res.status(200).json(
      new ApiResponse(200, 'Store updated successfully', {
        id: updatedStore.id,
        name: updatedStore.name,
        description: updatedStore.description,
      })
    );
  };
}
