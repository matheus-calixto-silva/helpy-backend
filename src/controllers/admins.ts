import { Router } from 'express';

import { createAdmin } from '../useCases/admins/createAdmin';
import { listAdmins } from '../useCases/admins/listAdmins';
import { removeAdmin } from '../useCases/admins/removeAdmin';
import { updateAdmin } from '../useCases/admins/updateAdmin';
import { getAdminById } from '../useCases/admins/getAdminById';

import { authAdmin } from '../utils/middleware';
import { upload } from '../utils/helpers';

export const adminsRouter = Router();

adminsRouter.get('/admins', authAdmin, listAdmins);

adminsRouter.post('/admins', authAdmin, upload.single('photo'), createAdmin);

adminsRouter.get('/admins/:adminId', authAdmin, getAdminById);

adminsRouter.put('/admins/:adminId', authAdmin, updateAdmin);

adminsRouter.delete('/admins/:adminId', authAdmin, removeAdmin);
