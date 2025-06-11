import type { Request, Response } from 'express';
import {
  ApiError,
  ApiResponse,
  expressControllerHandler,
} from '../../lib/express-api.helpers';
import { prisma } from '../../lib/db';
import {
  comparePassword,
  generateAccessToken,
  hashPassword,
} from '../../lib/auth.helpers';
import { envConfig } from '../../../envConfig';
import { cookieOptions } from '../../lib/constants';

export class Controller {
  public register = async (req: Request, res: Response): Promise<void> => {
    const { name, role, email, password } = req.body;
    const hashedPassword = await hashPassword(password);

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      throw new ApiError(409, 'User with this email already exists');
    }
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role,
        is_email_verified: true,
      },
    });
    res.status(201).json(
      new ApiResponse(201, 'User registered successfully', {
        userid: newUser.id,
      })
    );
  };

  public login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new ApiError(401, 'Invalid Credentials');
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      throw new ApiError(401, 'Invalid Credentials');
    }

    const accessToken = generateAccessToken(user.id);

    res.cookie(envConfig.JWT_NAME, accessToken, cookieOptions);
    res.status(201).json(new ApiResponse(201, 'User logged in successfully'));
  };

  public getProfile = async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
      throw new ApiError(401, 'Unauthorized');
    }

    const user = req.user;

    res
      .status(200)
      .json(new ApiResponse(200, 'User profile fetched successfully', user));
  };

  public logout = async (req: Request, res: Response): Promise<void> => {
    res.clearCookie(envConfig.JWT_NAME, cookieOptions);
    res.status(200).json(new ApiResponse(200, 'User logged out successfully'));
  };
}
