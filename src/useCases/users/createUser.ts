import { Request, Response } from 'express';

import bcrypt from 'bcrypt';

import { User } from '@models/user';

export const createUser = async (req: Request, res: Response) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Endpoint para criar um usuário.'

  const profilePic = req.file?.filename;
  const { firstname, lastname, username, email, password, phone, skills } =
    req.body;
  const parsedSkills = JSON.parse(skills);

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return res.status(400).json({
      error: 'username must be unique',
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = await User.create({
    firstname,
    lastname,
    username,
    profilePic,
    email,
    passwordHash,
    phone,
    skills: parsedSkills,
    role: 'user',
  });

  if (user) {
    const createdUser = await User.findById(user._id.toString()).populate({
      path: 'skills.skill',
      populate: {
        path: 'category',
      },
    });

    return res.status(201).json(createdUser);
  }

  return res.status(500).json({ error: 'Unable to create user' });
};
