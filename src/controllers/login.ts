import { Router } from 'express';
import { loginUser } from '../useCases/login/loginUser';

export const loginRouter = Router();

loginRouter.post('/login', loginUser);
