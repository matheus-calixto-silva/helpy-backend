import { Router } from 'express';

import { resetPassword } from '@useCases/passwordMails/resetPassword';
import { sendResetPasswordEmail } from '@useCases/passwordMails/sendResetPasswordEmail';

export const passwordMailsRouter = Router();

passwordMailsRouter.post('/send-password-email', sendResetPasswordEmail);

passwordMailsRouter.post('/reset-password/:token', resetPassword);
