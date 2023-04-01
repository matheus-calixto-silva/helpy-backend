import { Router } from 'express';

import { createAdmin } from '../useCases/admins/createAdmin';
import { listAdmins } from '../useCases/admins/listAdmins';
import { removeAdmin } from '../useCases/admins/removeAdmin';
import { updateAdmin } from '../useCases/admins/updateAdmin';
import { getAdminById } from '../useCases/admins/getAdminById';

export const adminsRouter = Router();

import { upload } from '../utils/helpers';

adminsRouter.get('/admins', listAdmins);

adminsRouter.post('/admins', upload.single('photo'), createAdmin);

adminsRouter.get('/admins/:adminId', getAdminById);

adminsRouter.put('/admins/:adminId', updateAdmin);

adminsRouter.delete('/admins/:adminId', removeAdmin);
