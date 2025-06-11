import { Request } from 'express';
import crypto from 'crypto';

export const extractApiKey = (
  req: Request
): {
  pubKey: string;
  privateKey: string;
} | null => {
  const pubKey =
    req.headers['x-api-key-pub'] || req.query.apiKey || req.body.apiKey;
  const privateKey =
    req.headers['x-api-key-priv'] || req.query.apiKey || req.body.apiKey;

  if (pubKey && privateKey) {
    return {
      pubKey,
      privateKey,
    };
  }
  return null;
};

export const isValidApiKey = (
  pubKey: string,
  privateKey: string,
  hashedPrivateKey: string
): boolean => {
  const isValidPubKey = pubKey.startsWith('bks_');
  const extractPrivateKey = privateKey.split('_')[2];

  // check if hash of extracted private key matches the hashed private key
  const hash_of_extractPrivateKey = crypto
    .createHash('sha256')
    .update(extractPrivateKey)
    .digest('hex');

  const isValidPrivKey = hash_of_extractPrivateKey === hashedPrivateKey;

  return (isValidPubKey && isValidPrivKey) || false;
};
