import { Router } from 'express';

import { sendResetPasswordEmail } from '../useCases/passwordMails/sendResetPasswordEmail';
import { resetPassword } from './../useCases/passwordMails/resetPassword';

export const passwordMailsRouter = Router();

passwordMailsRouter.post('/send-password-email', sendResetPasswordEmail);

passwordMailsRouter.post('/reset-password/:token', resetPassword);
