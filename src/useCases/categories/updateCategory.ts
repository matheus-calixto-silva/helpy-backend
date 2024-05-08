import { Request, Response } from 'express';

import { Category } from '@models/category';

export const updateCategory = async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const updates = req.body;

  const updatedCategory = await Category.findByIdAndUpdate(
    categoryId,
    updates,
    { new: true },
  );

  if (!updatedCategory) {
    return res.status(404).send({ error: 'Category not found' });
  }

  return res.status(200).json(updatedCategory);
};
