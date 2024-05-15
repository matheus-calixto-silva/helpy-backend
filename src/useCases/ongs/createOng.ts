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
      error: 'username must be unique',
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

  if (ong) {
    return res.status(201).send(ong);
  }

  return res.status(500).json({ error: 'Unable to create ong' });
};
