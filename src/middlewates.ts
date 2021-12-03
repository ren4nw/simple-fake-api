import { NextFunction, ParamsDictionary, Query, Request, Response } from 'express-serve-static-core';
import jwt from 'jsonwebtoken';

export const delay = (
  req: Request<ParamsDictionary, any, any, Query, Record<string, any>>,
  res: Response,
  next: NextFunction,
) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('');
      next();
    }, 2000);
  });
}

export const auth = (
  req: Request<ParamsDictionary, any, any, Query, Record<string, any>>,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json();
  }

  const [_, token] = authorization.split(' ');

  if (!token) {
    return res.status(401).json();
  }

  try {
    jwt.verify(token, String(process.env.SECRET));
  
    next();
  } catch (e) {
    return res.status(401).json();
  }
}
