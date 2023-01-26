import { Request, Response } from 'express';
import path from 'node:path';
import fs from 'node:fs';

import { Ong } from '../../models/ong';

export const deleteOng = async (req: Request, res: Response) => {
  const { ongId } = req.params;

  const user = await Ong.findById(ongId);
  await Ong.findByIdAndDelete(ongId);

  if (user) {
    fs.unlink(path.resolve('uploads', user.profilePic), (err) => {
      if (err) throw err;
      console.log('File deleted!');
    });
  }

  res.sendStatus(204);
};
