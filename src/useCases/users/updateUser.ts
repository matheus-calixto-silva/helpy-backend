import { Request, Response } from 'express';

import { User } from '../../models/user';

export const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const updates = req.body;

  const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });

  if (!updatedUser) {
    return res.status(404).send({ error: 'User not found' });
  }

  return res.status(200).json(updatedUser);
};
