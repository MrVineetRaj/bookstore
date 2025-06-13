import type { NextFunction, Request, Response } from 'express';
import logger from '../../logger';

type ControllerFunction = (req: Request, res: Response) => Promise<void>;

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly message: string;
  public readonly details?: Record<string, any>;
  public success: boolean;

  constructor(
    statusCode: number,
    message: string,
    details?: Record<string, any>
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.details = details;
    this.success = false;
  }
}

export class ApiResponse<T> {
  public readonly statusCode: number;
  public readonly message: string;
  public readonly data?: T;
  public success: boolean = true;

  constructor(statusCode: number, message: string, data?: T) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = statusCode < 400;
  }
}

export function expressControllerHandler(controller: ControllerFunction) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await controller(req, res);
    } catch (error) {
      console.log(error);
      if (error instanceof ApiError) {
        console.error('ApiError occurred in controller handler\n', {
          error: {
            statusCode: error.statusCode,
            message: error.message,
          },
          // req: {
        });
        res.status(error.statusCode).json({
          success: false,
          statusCode: error.statusCode,
          message: error.message,
          details: error.details,
        });
      } else if (error instanceof Error) {
        res.status(500).json({
          success: false,
          statusCode: 'INTERNAL_SERVER_ERROR',
          message: error.message,
        });
      } else {
        // logger.error('Unknown error occurred in controller handler');

        next();
      }
    }
  };
}
