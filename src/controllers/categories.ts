import { createCategory } from '@useCases/categories/createCategory';
import { getCategoryById } from '@useCases/categories/getCategoryById';
import { listCategories } from '@useCases/categories/listCategories';
import { removeCategory } from '@useCases/categories/removeCategory';
import { updateCategory } from '@useCases/categories/updateCategory';
import { Router } from 'express';

import { auth, authAdmin } from '@middlewares/autheticationMiddleware';

export const categoriesRouter = Router();

categoriesRouter.get('/categories', auth, listCategories);

categoriesRouter.post('/categories', authAdmin, createCategory);

categoriesRouter.get('/categories/:categoryId', auth, getCategoryById);

categoriesRouter.put('/categories/:categoryId', authAdmin, updateCategory);

categoriesRouter.delete('/categories/:categoryId', authAdmin, removeCategory);
