import crypto from 'crypto';
import type { Request, Response } from 'express';
import { ApiError, ApiResponse } from '../../lib/express-api.helpers';
import { prisma } from '../../lib/db';

export class Controller {
  public addOrUpdateReview = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { storeId, bookId } = req.params;
    const { rating, comment } = req.body;
    const userReview = await prisma.review.upsert({
      where: {
        book_id_user_id_store_id: {
          user_id: req.user.id,
          book_id: bookId,
          store_id: storeId,
        },
      },
      update: {
        rating,
        comment,
      },
      create: {
        user_id: req.user.id,
        book_id: bookId,
        store_id: storeId,
        rating,
        comment,
      },
    });

    res.status(201).json(
      new ApiResponse(201, 'Review received successfully', {
        cartItemId: userReview,
      })
    );
    return;
  };

  public deleteReview = async (req: Request, res: Response): Promise<void> => {
    const { storeId, bookId } = req.params;
    const doesReviewExists = await prisma.review.findUnique({
      where: {
        book_id_user_id_store_id: {
          user_id: req.user.id,
          book_id: bookId,
          store_id: storeId,
        },
      },
    });

    if (!doesReviewExists) {
      throw new ApiError(404, 'Item not found');
    }

    await prisma.review.delete({
      where: {
        book_id_user_id_store_id: {
          user_id: req.user.id,
          book_id: bookId,
          store_id: storeId,
        },
      },
    });

    res.status(201).json(new ApiResponse(201, 'Review deleted successfully'));
  };
}
