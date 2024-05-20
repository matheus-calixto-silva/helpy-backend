import { Request, Response } from 'express';

import { Skill } from '@models/skill';

export const getSkillById = async (req: Request, res: Response) => {
  const { skillId } = req.params;
  const skill = await Skill.findById(skillId).populate('category');

  if (skill) {
    return res.status(200).json(skill);
  }

  return res.status(404).send({ error: 'Error: Skill not found' });
};
