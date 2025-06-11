import { PrismaClient } from '../../generated/prisma/index.js';

// Extend the global type to include our prisma property
declare global {
  var prisma: PrismaClient | undefined;
}

const globalForPrisma = globalThis as typeof globalThis & {
  prisma: PrismaClient | undefined;
};

const db: PrismaClient = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db;
}

// Alternative export name if needed
export const prisma = db;