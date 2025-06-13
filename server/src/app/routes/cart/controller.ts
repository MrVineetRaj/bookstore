import crypto from 'crypto';
import type { Request, Response } from 'express';
import { ApiError, ApiResponse } from '../../lib/express-api.helpers';
import { prisma } from '../../lib/db';

export class Controller {
  public addToCart = async (req: Request, res: Response): Promise<void> => {
    const bookId = req.query.bookId;
    if (!bookId) {
      throw new ApiError(400, 'Book ID is required');
    }
    const storeId = req.params.storeId;
    if (!storeId) {
      throw new ApiError(400, 'Store ID is required');
    }

    const doesBookExists = await prisma.book.findUnique({
      where: {
        id: bookId as string,
        store_id: storeId,
      },
    });

    if (!doesBookExists) {
      throw new ApiError(404, 'Book not found');
    }

    const cartItem = await prisma.cartItem.create({
      data: {
        user_id: req.user.id,
        book_id: bookId as string,
        store_id: req.body.storeId,
      },
    });

    res.status(201).json(
      new ApiResponse(201, 'Book added to cart', {
        cartItemId: cartItem.id,
      })
    );
    return;
  };

  public removeFromCart = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const bookId = req.query.bookId;
    const doesCartItemExists = await prisma.cartItem.findUnique({
      where: {
        user_id_book_id: {
          user_id: req.user.id,
          book_id: bookId as string,
        },
      },
    });

    if (!doesCartItemExists) {
      throw new ApiError(404, 'Item not found');
    }

    await prisma.cartItem.delete({
      where: {
        user_id_book_id: {
          user_id: req.user.id,
          book_id: bookId as string,
        },
      },
    });

    res.status(201).json(new ApiResponse(201, 'Book deleted from cart'));
  };
}
