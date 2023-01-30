import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { User } from '../../models/user';

export const createUser = async (req: Request, res: Response) => {
  const profilePic = req.file?.filename;
  const { firstname, lastname, username, email, password, phone, skills } = req.body;
  const parsedSkills = JSON.parse(skills);

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return res.status(400).json({
      error: 'nome de usuário deve ser único',
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = await User.create({
    firstname, lastname, username, profilePic, email, passwordHash, phone, skills: parsedSkills
  });

  res.status(201).send(user);
};
