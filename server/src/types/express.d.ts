// src/types/express/index.d.ts
import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any; // Replace 'any' with your user type if available
    }
  }
}
