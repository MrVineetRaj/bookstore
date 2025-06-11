import type { NextFunction, Request, Response } from 'express';
import logger from '../../logger';

type ControllerFunction = (req: Request, res: Response) => Promise<void>;

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly message: string;
  public readonly details?: Record<string, any>;
  public success: boolean = false;

  constructor(
    statusCode: number,
    message: string,
    details?: Record<string, any>
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.details = details;
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
    } catch (error: any) {
      if (error instanceof ApiError) {
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
        logger.error('Unknown error occurred in controller handler', {
          error: typeof error === 'object' ? error : { raw: error },
          req: {
            method: req.method,
            url: req.url,
            headers: req.headers,
            body: req.body,
            params: req.params,
            query: req.query,
          },
        });

        next();
      }
    }
  };
}
