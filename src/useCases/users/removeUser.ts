import { Request, Response } from 'express';
import path from 'node:path';
import fs from 'node:fs';

import { User } from '../../models/user';

export const removeUser = async (req: Request, res: Response) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Endpoint para remove um usuário.'
  // #swagger.parameters['userId'] = { description: 'ID do usuário.' }

  const { userId } = req.params;

  const user = await User.findById(userId);
  await User.findByIdAndDelete(userId);

  if (user) {
    fs.unlink(path.resolve('uploads', user.profilePic), (err) => {
      if (err) throw err;
      console.log('File deleted!');
    });

    // #swagger.responses[204] = { description: 'Usuário removido' }
    return res.sendStatus(204);
  }

  // #swagger.responses[404] = { description: 'Usuário não encontrado' }
  return res.status(404).send({ error: 'User not found' });
};
