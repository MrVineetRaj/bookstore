import crypto from 'crypto';
import type { Request, Response } from 'express';
import { ApiError, ApiResponse } from '../../lib/express-api.helpers';
import { prisma } from '../../lib/db';

export class Controller {
  public addBookToStore = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { storeId } = req.params;

    if (!storeId) {
      throw new ApiError(404, 'Store not found');
    }
    const { title, description, author, price, cover_image } = req.body;

    const bookAlreadyExist = await prisma.book.findUnique({
      where: {
        title_author: {
          title,
          author,
        },
        store_id: storeId,
      },
    });

    if (bookAlreadyExist) {
      throw new ApiError(400, 'Book already in store', {
        bookid: bookAlreadyExist.id,
      });
    }

    const newBook = await prisma.book.create({
      data: {
        store_id: storeId,
        title,
        description: description ?? null,
        author,
        price,
        cover_image: cover_image ?? null,
      },
    });

    res.status(201).json(
      new ApiResponse(201, 'Book added to store', {
        bookid: newBook.id,
      })
    );
  };

  public deleteBookFromStore = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { storeId, bookId } = req.params;

    const doesBookExists = await prisma.book.findUnique({
      where: {
        store_id: storeId,
        id: bookId,
      },
    });

    if (!doesBookExists) {
      throw new ApiError(404, 'Book not found');
    }

    await prisma.book.delete({
      where: {
        store_id: storeId,
        id: bookId,
      },
    });

    res.status(201).json(new ApiResponse(201, 'Book deleted  successfully'));
  };

  public updateBook = async (req: Request, res: Response): Promise<void> => {
    const { storeId, bookId } = req.params;

    if (!storeId) {
      throw new ApiError(404, 'Store not found');
    }
    const { title, description, author, price, cover_image } = req.body;

    const doesBookExists = await prisma.book.findUnique({
      where: {
        id: bookId,
        store_id: storeId,
      },
    });

    if (!doesBookExists) {
      throw new ApiError(400, 'Book not found');
    }

    await prisma.book.update({
      where: {
        id: bookId,
        store_id: storeId,
      },
      data: {
        title,
        description: description ?? null,
        author,
        price,
        cover_image: cover_image ?? null,
      },
    });

    res.status(200).json(new ApiResponse(200, 'Book details updated successfully'));
  };
}
