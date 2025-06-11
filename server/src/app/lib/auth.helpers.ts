import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { envConfig } from '../../envConfig';
import { Request } from 'express';
export const generateAccessToken = (userId: string) => {
  const token = jwt.sign({ id: userId }, envConfig.JWT_SECRET, {
    expiresIn: '1d',
  });

  return token;
};

export const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  return hashedPassword;
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

export const extractToken = (req: Request) => {
  const token = req.cookies[envConfig.JWT_NAME];

  return token;
};

export const decodeToken = (token: string) => {
  const decoded: jwt.JwtPayload = jwt.verify(token, envConfig.JWT_SECRET) as jwt.JwtPayload;
  return decoded;
};
