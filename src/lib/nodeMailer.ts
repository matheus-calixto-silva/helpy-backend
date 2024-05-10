import 'dotenv/config';

import { createTransport } from 'nodemailer';

export const transporter = createTransport({
  service: process.env.MAIL_SERVICE!,
  auth: {
    user: process.env.MAIL_USER!,
    pass: process.env.MAIL_PASSWORD!,
  },
});
