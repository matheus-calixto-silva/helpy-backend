import { Request, Response } from 'express';

import { User } from '@models/user';

export const listUsers = async (_req: Request, res: Response) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Endpoint para obter todos os usuários.'

  const users = await User.find().populate({
    path: 'skills.skill',
    populate: {
      path: 'category',
    },
  });

  if (users) {
    return res.status(200).json(users);
  }

  return res.status(204);
};
