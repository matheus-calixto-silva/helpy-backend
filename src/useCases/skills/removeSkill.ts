import { Request, Response } from 'express';

import { Skill } from '../../models/skill';

export const removeSkill = async (req: Request, res: Response) => {
  const { skillId } = req.params;

  await Skill.findByIdAndDelete(skillId);

  return res.status(204).send();
};
