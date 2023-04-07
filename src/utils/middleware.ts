import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { CustomRequest } from '../types';

const secret = process.env.SECRET as string;

const getTokenFrom = (request: Request) => {
  const authorization = request.headers.authorization;
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = getTokenFrom(req);

  if (!token) {
    return res.status(401).send({ error: 'No token provided' });
  }

  const decoded = verify(token, secret);
  (req as CustomRequest).token = decoded;

  return next();
};

export const authAdmin = (req: Request, res: Response, next: NextFunction) => {
  const token = getTokenFrom(req);

  if (!token) {
    return res.status(401).send({ error: 'No token provided' });
  }

  const decoded = verify(token, secret) as { role: string };

  if (decoded.role !== 'admin') {
    return res.status(403).send({ error: 'Unauthorized, you are not admin' });
  }

  (req as CustomRequest).token = decoded;
  return next();
};

