import 'dotenv/config';
import { Request, Response } from 'express';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { Admin } from '@models/admin';
import { Ong } from '@models/ong';
import { User } from '@models/user';

import { IAdmin, IOng, IUser } from './../../types';

const env = process.env.SECRET as string;

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user: IAdmin | IOng | IUser | null =
    (await User.findOne({ username })) ||
    (await Ong.findOne({ username })) ||
    (await Admin.findOne({ username }));
  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash as string);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password',
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
    role: user.role,
  };

  const token = jwt.sign(userForToken, env, {
    expiresIn: 168 * 60 * 60,
  });

  return res
    .status(200)
    .json({ token, id: user._id, username: user.username, role: user.role });
};
