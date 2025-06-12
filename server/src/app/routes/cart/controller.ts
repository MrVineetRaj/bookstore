import crypto from 'crypto';
import type { Request, Response } from 'express';
import { ApiError, ApiResponse } from '../../lib/express-api.helpers';
import { prisma } from '../../lib/db';

export class Controller {
  public addToCart = async (req: Request, res: Response): Promise<void> => {
    const bookId = req.query.bookId;
    const { quantity } = req.body;
    const cartItem = await prisma.cartItem.upsert({
      where: {
        user_id_book_id: {
          user_id: req.user.id,
          book_id: bookId as string,
        },
      },
      update: {
        quantity: +quantity,
      },
      create: {
        user_id: req.user.id,
        book_id: bookId as string,
        quantity: +quantity,
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
