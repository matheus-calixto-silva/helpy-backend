import { Router } from 'express';

import { createAdmin } from '@useCases/admins/createAdmin';
import { getAdminById } from '@useCases/admins/getAdminById';
import { listAdmins } from '@useCases/admins/listAdmins';
import { removeAdmin } from '@useCases/admins/removeAdmin';
import { updateAdmin } from '@useCases/admins/updateAdmin';

import { uploadPhoto } from '@lib/uploadPhoto';
import { authAdmin } from '@middlewares/autheticationMiddleware';

export const adminsRouter = Router();

adminsRouter.get('/admins', authAdmin, listAdmins);

adminsRouter.post(
  '/admins',
  authAdmin,
  uploadPhoto.single('photo'),
  createAdmin,
);

adminsRouter.get('/admins/:adminId', authAdmin, getAdminById);

adminsRouter.put('/admins/:adminId', authAdmin, updateAdmin);

adminsRouter.delete('/admins/:adminId', authAdmin, removeAdmin);
