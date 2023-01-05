import { Router } from 'express';
import { createCategory } from '../useCases/categories/createCategory';
import { listCategories } from '../useCases/categories/listCategories';

export const categoriesRouter = Router();

categoriesRouter.get('/categories', listCategories);

categoriesRouter.post('/categories', createCategory);
