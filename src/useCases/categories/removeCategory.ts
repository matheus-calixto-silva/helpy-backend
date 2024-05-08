import { Request, Response } from 'express';

import { Category } from '@models/category';
import { Skill } from '@models/skill';

export const removeCategory = async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const category = await Category.findById(categoryId);
  const skills = await Skill.find();
  const skillUsingCategory = skills.find(
    (skill) => skill.category?.toString() === category?._id.toString(),
  );

  if (skillUsingCategory) {
    return res
      .status(401)
      .json({ error: 'This category is used by one or more skills' });
  }

  await Category.findByIdAndDelete(categoryId);

  return res.status(204).send();
};
