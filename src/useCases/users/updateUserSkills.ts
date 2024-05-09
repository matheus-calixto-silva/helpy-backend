import { Request, Response } from 'express';

import { User } from '@models/user';

export const updateUserSkills = async (req: Request, res: Response) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Endpoint para atualizar as skills de um usuário.'
  // #swagger.parameters['userId'] = { description: 'ID do usuário.' }

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

    await User.findByIdAndUpdate(
      userId,
      { skills: updatedSkills },
      { new: true },
    );

    const populatedUser = await User.findById(userId).populate({
      path: 'skills.skill',
      populate: {
        path: 'category',
      },
    });

    // #swagger.responses[200] = { description: 'Skills do usuário atualizados' }
    return res.status(200).json(populatedUser);
  } else {
    // #swagger.responses[404] = { description: 'Usuário não encontrado' }
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }
};
