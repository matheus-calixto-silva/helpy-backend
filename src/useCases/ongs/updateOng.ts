import { Request, Response } from 'express';

import { Ong } from '../../models/ong';
import { IOng } from '../../types';

import { genNewPasswordHash } from '@lib/genNewPasswordHash';

export const updateOng = async (req: Request, res: Response) => {
  const { ongId } = req.params;
  const updates: IOng = req.body;
  let obj = {};

  if (updates) {
    if (updates.password) {
      const newPasswordHash = await genNewPasswordHash(updates.password);
      updates.passwordHash = newPasswordHash;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...withoutPassword } = updates;
      obj = { ...withoutPassword };

      const updatedOngWithPassword = await Ong.findByIdAndUpdate(ongId, obj, {
        new: true,
      });
      return res.status(200).json(updatedOngWithPassword);
    }

    const updatedOng = await Ong.findByIdAndUpdate(ongId, updates, {
      new: true,
    });
    return res.status(200).json(updatedOng);
  }

  return res.status(404).send({ error: 'Error: ONG not found' });
};
