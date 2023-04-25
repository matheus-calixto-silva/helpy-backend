import 'dotenv/config';
import { createTransport } from 'nodemailer';

export const PORT = process.env.PORT;
export const MONGODB_URI = process.env.MONGODB_URI ?? '';
export const SECRET_KEY = process.env.SECRET as string;

export const transporter = createTransport({
  service: process.env.MAIL_SERVICE as string,
  auth: {
    user: process.env.MAIL_USER as string,
    pass: process.env.MAIL_PASSWORD as string
  }
});
