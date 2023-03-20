import { Request, Response } from 'express';

import { Skill } from '../../models/skill';

export const getSkillById = async (req: Request, res: Response) => {
  const { skillId } = req.params;
  const skill = await Skill.findById(skillId).populate('category');

  return res.status(200).json(skill);
};
