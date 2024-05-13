import { Request, Response } from 'express';

import { Category } from '@models/category';

export const createCategory = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const category = await Category.create({ name, description });

  if (category) {
    res.status(201).json(category);
  }

  res.status(500).json({ error: 'Unable to create category' });
};
