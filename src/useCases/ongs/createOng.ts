import { Request, Response } from 'express';

import { genNewPasswordHash } from '@lib/genNewPasswordHash';

import { Ong } from '@models/ong';

export const createOng = async (req: Request, res: Response) => {
  const profilePic = req.file?.filename;
  const { name, username, email, password, phone, address, cnpj, maxEvents } =
    req.body;

  const existingUser = await Ong.findOne({ username });

  if (existingUser) {
    return res.status(400).json({
      error: 'nome de usuário deve ser único',
    });
  }

  const passwordHash = await genNewPasswordHash(password);

  const ong = await Ong.create({
    name,
    username,
    profilePic,
    email,
    passwordHash,
    phone,
    address,
    cnpj,
    maxEvents,
    events: [],
    role: 'ong',
  });

  return res.status(201).send(ong);
};
