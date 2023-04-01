import { Request, Response } from 'express';

import { Skill } from '../../models/skill';

export const listSkills = async(_req: Request, res: Response) => {
  const skills = await Skill.find().populate('category');

  return res.status(200).json(skills);
};
