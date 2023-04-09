import { Router } from 'express';

import { createUser } from '../useCases/users/createUser';
import { listUsers } from '../useCases/users/listUsers';
import { removeUser } from '../useCases/users/removeUser';
import { updateUserSkills } from '../useCases/users/updateUserSkills';
import { getUserById } from '../useCases/users/getUserById';
import { updateUser } from '../useCases/users/updateUser';

import { auth } from '../utils/middleware';
import { upload } from '../utils/helpers';

export const usersRouter = Router();

usersRouter.get('/users', auth, listUsers);

usersRouter.post('/users', upload.single('photo'), createUser);

usersRouter.get('/users/:userId', auth, getUserById);

usersRouter.put('/users/:userId', auth, updateUser);

usersRouter.patch('/users/:userId', auth, updateUserSkills);

usersRouter.delete('/users/:userId', auth, removeUser);
