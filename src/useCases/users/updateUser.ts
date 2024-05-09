import { Request, Response } from 'express';

import { User } from '@models/user';
import { IUser } from '../../types';

import { genNewPasswordHash } from '@lib/genNewPasswordHash';

export const updateUser = async (req: Request, res: Response) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Endpoint para atualizar um usuário.'
  // #swagger.parameters['userId'] = { description: 'ID do usuário.' }

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

      const updatedUserWithPassword = await User.findByIdAndUpdate(
        userId,
        obj,
        { new: true },
      );
      /* #swagger.responses[200] = {
          schema: { $ref: "#/definitions/User" },
          description: 'Usuário atualizado'
        } */
      return res.status(200).json(updatedUserWithPassword);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });
    /* #swagger.responses[200] = {
        schema: { $ref: "#/definitions/UpdatedUser" },
        description: 'Usuário atualizado'
      } */
    return res.status(200).json(updatedUser);
  }

  // #swagger.responses[404] = { description: 'Usuário não encontrado' }
  return res.status(404).send({ error: 'User not found' });
};
