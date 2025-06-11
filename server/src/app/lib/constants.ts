import { CookieOptions } from 'express';

export const cookieOptions: CookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: process.env.NODE_ENV !== 'development',
  sameSite: 'none',
  secure: process.env.NODE_ENV !== 'development',
};
