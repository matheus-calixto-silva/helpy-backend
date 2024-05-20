import { Request, Response } from 'express';

import { Skill } from '@models/skill';

export const createSkill = async (req: Request, res: Response) => {
  const { name, category } = req.body;
  const skill = await Skill.create({ name, category });

  if (skill) {
    return res.status(201).json(skill);
  }

  return res.status(500).json({ error: 'Unable to create skill' });
};
