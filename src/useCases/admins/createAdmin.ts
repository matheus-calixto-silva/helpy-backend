import { Request, Response } from 'express';

import { Admin } from '@models/admin';

import { genNewPasswordHash } from '@utils/helpers';

export const createAdmin = async (req: Request, res: Response) => {
  const profilePic = req.file?.filename;
  const { firstname, lastname, username, email, password, phone } = req.body;

  const existingAdmin = await Admin.findOne({ username });

  if (existingAdmin) {
    return res.status(400).json({
      error: 'nome de usuário deve ser único',
    });
  }

  const passwordHash = await genNewPasswordHash(password);

  const admin = await Admin.create({
    firstname,
    lastname,
    username,
    profilePic,
    email,
    passwordHash,
    phone,
    role: 'admin',
  });

  const createdAdmin = await Admin.findById(admin._id.toString());

  return res.status(201).json(createdAdmin);
};
