import { Request, Response } from 'express';

import { User } from '../../models/user';

export const listUsers = async (req: Request, res: Response) => {
  const users = await User
    .find()
    .populate({
      path: 'skills.skill',
      populate: {
        path: 'category'
      }
    });

  return res.status(200).json(users);
};
