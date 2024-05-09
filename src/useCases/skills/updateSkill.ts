import { Request, Response } from 'express';

import { Skill } from '@models/skill';

export const updateSkill = async (req: Request, res: Response) => {
  const { skillId } = req.params;
  const updates = req.body;

  const updatedSkill = await Skill.findByIdAndUpdate(skillId, updates, {
    new: true,
  });

  if (!updatedSkill) {
    return res.status(404).send({ error: 'Category not found' });
  }

  return res.status(200).json(updatedSkill);
};
