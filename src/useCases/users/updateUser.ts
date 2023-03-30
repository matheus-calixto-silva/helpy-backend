import { Request, Response } from 'express';

import { User } from '../../models/user';
import { IUser } from '../../types';

import { genNewPasswordHash } from '../../utils/helpers';

export const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const updates: IUser = req.body;
  let obj = {};

  if (updates) {
    if (updates.password) {
      const newPasswordHash = await genNewPasswordHash(updates.password);
      updates.passwordHash = newPasswordHash;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...withoutPassword } = updates;
      obj = { ...withoutPassword };

      const updatedUserWithPassword = await User.findByIdAndUpdate(userId, obj, { new: true });
      return res.status(200).json(updatedUserWithPassword);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
    return res.status(200).json(updatedUser);
  }

  return res.status(404).send({ error: 'User not found' });
};
