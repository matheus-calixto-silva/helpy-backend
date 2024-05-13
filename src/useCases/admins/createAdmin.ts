import { Request, Response } from 'express';

import { Admin } from '@models/admin';

import { genNewPasswordHash } from '@lib/genNewPasswordHash';

export const createAdmin = async (req: Request, res: Response) => {
  const profilePic = req.file?.filename;
  const { firstname, lastname, username, email, password, phone } = req.body;

  const existingAdmin = await Admin.findOne({ username });

  if (existingAdmin) {
    return res.status(400).json({
      error: 'username must be unique',
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

  if (admin) {
    const createdAdmin = await Admin.findById(admin._id.toString());

    return res.status(201).json(createdAdmin);
  }

  return res.status(500).json({ error: 'Unable to create admin' });
};
