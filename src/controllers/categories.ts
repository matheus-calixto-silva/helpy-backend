import { Router } from 'express';
import { createCategory } from '../useCases/categories/createCategory';
import { updateCategory } from '../useCases/categories/updateCategory';
import { removeCategory } from '../useCases/categories/removeCategory';
import { listCategories } from '../useCases/categories/listCategories';
import { getCategoryById } from '../useCases/categories/getCategoryById';

import { auth, authAdmin } from '../utils/middleware';

export const categoriesRouter = Router();

categoriesRouter.get('/categories', auth, listCategories);

categoriesRouter.post('/categories', authAdmin, createCategory);

categoriesRouter.get('/categories/:categoryId', auth, getCategoryById);

categoriesRouter.put('/categories/:categoryId', authAdmin, updateCategory);

categoriesRouter.delete('/categories/:categoryId', authAdmin, removeCategory);
