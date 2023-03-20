import { Router } from 'express';
import { createCategory } from '../useCases/categories/createCategory';
import { updateCategory } from '../useCases/categories/updateCategory';
import { removeCategory } from '../useCases/categories/removeCategory';
import { listCategories } from '../useCases/categories/listCategories';
import { getCategoryById } from '../useCases/categories/getCategoryById';

export const categoriesRouter = Router();

categoriesRouter.get('/categories', listCategories);

categoriesRouter.post('/categories', createCategory);

categoriesRouter.get('/categories/:categoryId', getCategoryById);

categoriesRouter.put('/categories/:categoryId', updateCategory);

categoriesRouter.delete('/categories/:categoryId', removeCategory);
