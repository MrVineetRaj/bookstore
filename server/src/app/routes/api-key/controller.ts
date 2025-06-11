import crypto from 'crypto';
import type { Request, Response } from 'express';
import { ApiResponse } from '../../lib/express-api.helpers';
import { prisma } from '../../lib/db';

export class Controller {
  public generateKey = async (req: Request, res: Response): Promise<void> => {
    const randomString = crypto.randomBytes(6).toString('hex');
    const pub_key = 'bks_' + randomString;
    const randomStingForPrivKey = crypto.randomBytes(24).toString('hex');
    const priv_key = 'bks_priv_' + randomStingForPrivKey;
    const priv_key_hash = crypto
      .createHash('sha256')
      .update(randomStingForPrivKey)
      .digest('hex');

    const newApiKey = await prisma.apiKey.create({
      data: {
        seller_id: req.user?.id || '',
        pub_key,
        priv_key: priv_key_hash,
      },
    });
    res.status(201).json(
      new ApiResponse(201, 'Api key generated successfully', {
        pub_key: pub_key,
        priv_key: priv_key,
        id: newApiKey.id,
        description:
          'Private key will not be shown again, please save it securely.',
      })
    );
  };

  public rotateKey = async (req: Request, res: Response): Promise<void> => {
    const { apKeyId } = req.params;
    const { pub_key } = req.body;

    const randomStingForPrivKey = crypto.randomBytes(24).toString('hex');
    const priv_key = 'bks_priv_' + randomStingForPrivKey;
    const priv_key_hash = crypto
      .createHash('sha256')
      .update(randomStingForPrivKey)
      .digest('hex');

    const existingKey = await prisma.apiKey.findUnique({
      where: {
        id: apKeyId,
        pub_key,
      },
    });
    if (!existingKey) {
      res.status(404).json(
        new ApiResponse(404, 'Api key not found', {
          pub_key,
          id: apKeyId,
          description: 'Please check the provided public key.',
        })
      );
      return;
    }
    await prisma.apiKey.update({
      where: {
        id: apKeyId,
        pub_key,
      },
      data: {
        priv_key: priv_key_hash,
      },
    });

    res.status(201).json(
      new ApiResponse(201, 'Private key rotated successfully', {
        pub_key,
        priv_key,
        id: apKeyId,
        description:
          'Private key will not be shown again, please save it securely.',
      })
    );
  };

  public deleteKey = async (req: Request, res: Response): Promise<void> => {
    const { apKeyId } = req.params;
    const { pub_key } = req.body;
    const apiKey = await prisma.apiKey.findUnique({
      where: {
        id: apKeyId,
        pub_key,
      },
    });

    if (!apiKey) {
      res.status(404).json(
        new ApiResponse(404, 'Api key not found', {
          pub_key,
          id: apKeyId,
          description: 'Please check the provided public key.',
        })
      );
      return;
    }
    await prisma.apiKey.delete({
      where: {
        id: apKeyId,
        pub_key,
      },
    });

    res.status(200).json(new ApiResponse(200, 'Api key deleted successfully'));
  };

  public getApiKeys = async (req: Request, res: Response): Promise<void> => {
    const apiKeys = await prisma.apiKey.findMany({
      where: {
        seller_id: req.user?.id || '',
      },
      orderBy: {
        created_at: 'desc',
      },
      select: {
        id: true,
        pub_key: true,
        created_at: true,
        updated_at: true,
      },
    });

    res
      .status(200)
      .json(new ApiResponse(200, 'Api keys fetched successfully', apiKeys));
  };
}
