import { Request, Response } from 'express';

import { Category } from '@models/category';

export const listCategories = async (_req: Request, res: Response) => {
  const categories = await Category.find();

  if (categories) {
    return res.status(200).json(categories);
  }

  return res.status(204).send('No categories found.');
};
