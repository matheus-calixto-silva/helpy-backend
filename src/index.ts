import { adminsRouter } from '@controllers/admins';
import { categoriesRouter } from '@controllers/categories';
import { loginRouter } from '@controllers/login';
import { ongsRouter } from '@controllers/ongs';
import { passwordMailsRouter } from '@controllers/passwordMails';
import { skillsRouter } from '@controllers/skills';
import { usersRouter } from '@controllers/users';
import { MONGODB_URI, PORT } from '@utils/config';
import { error, info } from '@utils/logger';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import path from 'node:path';
import swaggerUi from 'swagger-ui-express';
import * as swaggerFile from '../swagger_output.json';

mongoose.set('strictQuery', true);
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    const app = express();

    app.use(express.static('dist'));
    app.use(cors());
    app.use(express.json());
    app.use(categoriesRouter);
    app.use(skillsRouter);
    app.use(usersRouter);
    app.use(ongsRouter);
    app.use(loginRouter);
    app.use(adminsRouter);
    app.use(passwordMailsRouter);
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
    app.use(
      '/uploads',
      express.static(path.resolve(__dirname, '..', 'uploads')),
    );

    app.listen(PORT, () => {
      info(`🚀 Server is running on http://localhost:${PORT}`);
      info(`API documentation: http://localhost:${PORT}/doc`);
      info('connected to mongodb');
    });
  })
  .catch((err) => error('error connecting to mongodb', err.message));
