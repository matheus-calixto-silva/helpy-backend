import { SendMailOptions } from 'nodemailer';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import { User } from '../../models/user';
import { Admin } from '../../models/admin';
import { Ong } from '../../models/ong';

import { PORT, transporter } from '../../utils/config';
import { IAdmin, IOng, IUser } from '../../types';

const secret = process.env.SECRET as string;

export const sendResetPasswordEmail = async (req: Request, res: Response) => {
  const { email } = req.body;

  const user: IAdmin | IOng | IUser | null =
    await User.findOne({ email }) || await Ong.findOne({ email }) || await Admin.findOne({ email });

  if (!user) {
    return res.status(404).send('Usuário não encontrado');
  }

  const token = jwt.sign({ _id: user._id }, secret);

  const resetUrl = `http://localhost:${PORT}/reset-password/${token}`;
  const mailOptions: SendMailOptions = {
    to: email,
    subject: 'Redefinição de senha',
    html: `Para redefinir sua senha, clique neste link: <a href="${resetUrl}">${resetUrl}</a>`
  };

  await transporter.sendMail(mailOptions);

  return res.status(200).send('Email de redefinição de senha enviado');
};
