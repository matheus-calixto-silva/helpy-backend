import 'dotenv/config';
import { Request, Response } from 'express';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { User } from '../../models/user';
import { Ong } from '../../models/ong';
import { Admin } from '../../models/admin';

import { IAdmin, IOng, IUser } from './../../types';

const env = process.env.SECRET as string;

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user: IAdmin | IOng | IUser | null =
    await User.findOne({ username }) || await Ong.findOne({ username }) || await Admin.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash as string);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password',
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, env, {
    expiresIn: 168 * 60 * 60,
  });

  return res
    .status(200)
    .json({ token, username: user.username, role: user.role });
};
