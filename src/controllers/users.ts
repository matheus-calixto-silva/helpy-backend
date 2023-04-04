import { Router } from 'express';

import { createUser } from '../useCases/users/createUser';
import { listUsers } from '../useCases/users/listUsers';
import { removeUser } from '../useCases/users/removeUser';
import { updateUserSkills } from '../useCases/users/updateUserSkills';
import { getUserById } from '../useCases/users/getUserById';
import { updateUser } from '../useCases/users/updateUser';

export const usersRouter = Router();

import { upload } from '../utils/helpers';

usersRouter.get('/users', listUsers);

usersRouter.post('/users', upload.single('photo'), createUser);

usersRouter.get('/users/:userId', getUserById);

usersRouter.put('/users/:userId', updateUser);

usersRouter.patch('/users/:userId', updateUserSkills);

usersRouter.delete('/users/:userId', removeUser);
