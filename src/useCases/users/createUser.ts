import { Request, Response } from 'express';
import { hash } from 'bcrypt';

import { User } from '../../models/user';

export const createUser = async (req: Request, res: Response) => {
  const imagePath = req.file?.filename;
  const { firstname, lastname, username, email, password, phone, skills } = req.body;
  const parsedSkills = JSON.parse(skills);

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return res.status(400).json({
      error: 'nome de usuário deve ser único',
    });
  }

  const saltRounds = 10;
  const passwordHash = await hash(password, saltRounds);

  const user = User.create({
    firstname, lastname, username, imagePath, email, passwordHash, phone, skills: parsedSkills
  });
  res.status(201).json(user);
};
