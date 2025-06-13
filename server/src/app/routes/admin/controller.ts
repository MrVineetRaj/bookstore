import crypto from 'crypto';
import type { Request, Response } from 'express';
import { ApiError, ApiResponse } from '../../lib/express-api.helpers';
import { prisma } from '../../lib/db';
import {
  generateRandomSellers,
  generateRandomStores,
  generateCartItems,
  generateRandomBooks,
  generateRandomCustomers,
  generateRandomReviews,
} from '../../lib/seed.data';
import { hashPassword } from '../../lib/auth.helpers';
import { UserRole } from '../../../generated/prisma';

const wait = async (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

export class Controller {
  public seedData = async (req: Request, res: Response): Promise<void> => {
    const hashedPassword = await hashPassword('1234');
    // await prisma.user.createMany({
    //   data: generateRandomSellers(5).map((seller) => ({
    //     ...seller,
    //     password: hashedPassword, // Random password for sellers
    //   })),
    // });

    const sellers = await prisma.user.findMany({
      where: {
        role: UserRole.SELLER,
      },
      select: {
        id: true,
      },
    });

    console.log(`${sellers.length} Sellers seeded successfully`);
    await wait(1000);

    const seller_ids: string[] = sellers.map((seller) => seller.id);

    generateRandomStores(15, seller_ids).forEach(async (store) => {
      const doesExist = await prisma.store.findUnique({
        where: {
          owner_id_name: {
            owner_id: store.owner_id,
            name: store.name,
          },
        },
      });

      if (!doesExist) {
        await prisma.store.create({
          data: store,
        });
      }
    });
    
    const stores = await prisma.store.findMany({
      select: {
        id: true,
      },
    });

    console.log(`${stores.length} Stores seeded successfully`);

    await wait(1000);

    const store_ids: string[] = stores.map((store) => store.id);
    await prisma.book.createMany({
      data: generateRandomBooks(50, store_ids),
    });

    const books = await prisma.book.findMany({
      select: {
        id: true,
        store_id: true,
      },
    });
    console.log(`${books.length} Books seeded successfully`);

    await wait(1000);

    let store_with_books: { [key: string]: string[] } = {};

    books.forEach((book) => {
      if (!store_with_books[book.store_id]) {
        store_with_books[book.store_id] = [];
      }
      store_with_books[book.store_id].push(book.id);
    });

    await prisma.user.createMany({
      data: generateRandomCustomers(10).map((customer) => ({
        ...customer,
        password: hashedPassword, // Random password for customers
      })),
    });

    const users = await prisma.user.findMany({
      where: {
        role: UserRole.CUSTOMER,
      },
      select: {
        id: true,
      },
    });

    const user_ids: string[] = users.map((user) => user.id);

    console.log(`${user_ids.length} Customers seeded successfully`);
    await wait(1000);

    await prisma.cartItem.createMany({
      data: generateCartItems(50, user_ids, store_with_books),
    });

    await prisma.review.createMany({
      data: generateRandomReviews(50, store_with_books, user_ids),
    });

    console.log(` seeded successfully`);
    await wait(1000);
    res.status(201).json(
      new ApiResponse(201, 'Data seeded Successfully', {
        seller_ids,
        store_ids,
      })
    );
  };
}
