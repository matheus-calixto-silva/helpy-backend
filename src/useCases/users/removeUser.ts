import { Request, Response } from 'express';
import path from 'node:path';
import fs from 'node:fs';

import { User } from '../../models/user';

export const removeUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const user = await User.findById(userId);
  await User.findByIdAndDelete(userId);

  if (user) {
    fs.unlink(path.resolve('uploads', user.profilePic), (err) => {
      if (err) throw err;
      console.log('File deleted!');
    });
  }

  res.sendStatus(204);
};
