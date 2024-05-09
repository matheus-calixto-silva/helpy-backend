import { Request, Response } from 'express';

import { Skill } from '@models/skill';

export const createSkill = async (req: Request, res: Response) => {
  const { name, category } = req.body;
  const skill = await Skill.create({ name, category });

  res.status(201).json(skill);
};
