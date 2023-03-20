import { Request, Response } from 'express';
import { User } from '../../models/user';

export const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await User.findById(userId).populate({
    path: 'skills.skill',
    populate: {
      path: 'category'
    }
  });

  return res.status(200).json(user);
};
