import { Request, Response } from 'express';

import { Admin } from '@models/admin';
import { IAdmin } from './../../types';

import { genNewPasswordHash } from '@utils/helpers';

export const updateAdmin = async (req: Request, res: Response) => {
  const { adminId } = req.params;
  const updates: IAdmin = req.body;
  let obj = {};

  if (updates) {
    if (updates.password) {
      const newPasswordHash = await genNewPasswordHash(updates.password);
      updates.passwordHash = newPasswordHash;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...withoutPassword } = updates;
      obj = { ...withoutPassword };

      const updatedAdminWithPassword = await Admin.findByIdAndUpdate(
        adminId,
        obj,
        { new: true },
      );
      return res.status(200).json(updatedAdminWithPassword);
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(adminId, updates, {
      new: true,
    });
    return res.status(200).json(updatedAdmin);
  }

  return res.status(404).send({ error: 'Admin not found' });
};
