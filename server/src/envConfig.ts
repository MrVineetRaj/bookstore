import 'dotenv/config';
import { z } from 'zod';
import logger from './logger';

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string().min(1),
  JWT_EXPIRATION: z.string().default('1h'),
  JWT_NAME: z.string().default('access_token'),
  CORS_ORIGIN: z.string().default('*'),
  BASE_URL: z.string().min(1),
});

const createEnv = () => {
  const validateEnv = envSchema.safeParse(process.env);
  if (!validateEnv.success) {
    logger.info('Invalid environment variables', validateEnv.error.message);
    process.exit(1);
  }
  return validateEnv.data;
};

export const envConfig = createEnv();
