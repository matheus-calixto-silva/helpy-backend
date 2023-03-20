import { Request, Response } from 'express';

import { Category } from '../../models/category';

export const getCategoryById = async(req: Request, res: Response) => {
  const { categoryId } = req.params;
  const category = await Category.findById(categoryId);

  return res.status(200).json(category);
};
