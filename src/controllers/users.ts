import path from 'node:path';
import multer from 'multer';
import { Router } from 'express';

import { createUser } from '../useCases/users/createUser';
import { listUsers } from '../useCases/users/listUsers';
import { removeUser } from '../useCases/users/removeUser';
import { updateUserSkills } from '../useCases/users/updateUserSkills';
import { getUserById } from '../useCases/users/getUserById';


export const usersRouter = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve('uploads'));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});


usersRouter.get('/users', listUsers);

usersRouter.post('/users', upload.single('photo'), createUser);

usersRouter.get('/users/:userId', getUserById);

usersRouter.patch('/users/:userId', updateUserSkills);

usersRouter.delete('/users/:userId', removeUser);
