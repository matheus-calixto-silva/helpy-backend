import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { Admin } from '@models/admin';
import { Ong } from '@models/ong';
import { User } from '@models/user';

import { IAdmin, IOng, IUser } from '../../types';

import { env } from '@config/env';
import { genNewPasswordHash } from '@utils/helpers';

const UpdateUserByRole = async (
  user: IAdmin | IOng | IUser,
  newPassword: string,
) => {
  const { role, _id } = user;
  const newPasswordHash = await genNewPasswordHash(newPassword);
  const updates = { passwordHash: newPasswordHash };
  const newTrue = { new: true };

  switch (role) {
    case 'admin':
      await Admin.findByIdAndUpdate(_id, updates, newTrue);
      break;
    case 'user':
      await User.findByIdAndUpdate(_id, updates, newTrue);
      break;
    case 'ong':
      await Ong.findByIdAndUpdate(_id, updates, newTrue);
      break;
    default:
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { password } = req.body;

  if (token && password) {
    const decoded = verify(token, env.secretKey) as { _id: string };

    const user: IAdmin | IOng | IUser | null =
      (await User.findById(decoded._id)) ||
      (await Ong.findById(decoded._id)) ||
      (await Admin.findById(decoded._id));

    if (user) {
      await UpdateUserByRole(user, password);

      return res.status(200).send('Senha atualizada com sucesso');
    }

    return res.status(400).send('Usuário não encontrado');
  } else {
    return res.status(401).send('Token inválido');
  }
};
