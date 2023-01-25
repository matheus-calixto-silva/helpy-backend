import { Request, Response } from 'express';

import { Category } from '../../models/category';

export const removeCategory = async (req: Request, res: Response) => {
  const { categoryId } = req.params;

  await Category.findByIdAndDelete(categoryId);

  return res.status(204).send();
};
