import { Router } from 'express';

import { getOngEventById } from '@useCases/ongs/getOngEventById';
import { addUserToEvent } from '@useCases/users/addUserToEvent';
import { createUser } from '@useCases/users/createUser';
import { getUserById } from '@useCases/users/getUserById';
import { listAllEvents } from '@useCases/users/listAllEvents';
import { listUsers } from '@useCases/users/listUsers';
import { removeUser } from '@useCases/users/removeUser';
import { updateUser } from '@useCases/users/updateUser';
import { updateUserSkills } from '@useCases/users/updateUserSkills';

import { uploadPhoto } from '@lib/uploadPhoto';
import { auth } from '@middlewares/autheticationMiddleware';

export const usersRouter = Router();

usersRouter.get('/users', auth, listUsers);

usersRouter.get('/users/events/all', auth, listAllEvents);

usersRouter.get('/users/events/:eventId', auth, getOngEventById);

usersRouter.post('/users', uploadPhoto.single('photo'), createUser);

usersRouter.get('/users/:userId', auth, getUserById);

usersRouter.put('/users/:userId', auth, updateUser);

usersRouter.patch('/users/:userId', auth, updateUserSkills);

usersRouter.delete('/users/:userId', auth, removeUser);

usersRouter.patch('/users/:userId/events/:eventId', auth, addUserToEvent);
