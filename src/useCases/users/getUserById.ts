import { Request, Response } from 'express';

import { User } from '@models/user';

export const getUserById = async (req: Request, res: Response) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Endpoint para obter um usuário.'
  // #swagger.parameters['userId'] = { description: 'ID do usuário.' }

  const { userId } = req.params;
  const user = await User.findById(userId).populate({
    path: 'skills.skill',
    populate: {
      path: 'category',
    },
  });

  if (user) {
    /* #swagger.responses[200] = {
       schema: { $ref: "#/definitions/User" },
       description: 'Usuário encontrado'
} */
    return res.status(200).json(user);
  }

  // #swagger.responses[404] = { description: 'Usuário não encontrado' }
  return res.status(404).send({ error: 'User not found' });
};
