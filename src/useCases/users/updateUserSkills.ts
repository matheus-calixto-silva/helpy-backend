import { Request, Response } from 'express';

import { User } from '../../models/user';

export const updateUserSkills = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { skills } = req.body;
  const user = await User.findById(userId);
  const parsedSkills = skills
    .split(',')
    .filter(Boolean)
    .map((skillId: string) => {
      return { skill: skillId };
    });
  if (user) {
    const updatedSkills = [...user.skills, ...parsedSkills];
    const updatedUser = await User.findByIdAndUpdate(userId, { skills: updatedSkills }, { new: true });
    return res.status(200).json(updatedUser);
  } else {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }
};
