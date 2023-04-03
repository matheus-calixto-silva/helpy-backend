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

  if (user) {
    return res.status(200).json(user);
  }

  return res.status(404).send({ error: 'User not found' });
};
