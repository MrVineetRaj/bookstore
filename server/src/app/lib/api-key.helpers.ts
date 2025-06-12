import { Request } from 'express';
import crypto from 'crypto';

export const extractApiKey = (
  req: Request
): {
  pubKey: string;
  privateKey: string;
} | null => {
  const pubKey = req.headers['x-pub-key'];
  const privateKey = req.headers['x-api-key'];

  if (pubKey && privateKey) {
    return {
      pubKey: pubKey as string,
      privateKey: privateKey as string,
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
