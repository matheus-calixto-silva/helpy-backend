import 'dotenv/config';
import path from 'node:path';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import * as swaggerFile from '../swagger_output.json';
import { categoriesRouter } from './controllers/categories';
import { skillsRouter } from './controllers/skills';
import { usersRouter } from './controllers/users';
import { ongsRouter } from './controllers/ongs';
import { loginRouter } from './controllers/login';
import { MONGODB_URI, PORT } from './utils/config';
import { info, error } from './utils/logger';
import { adminsRouter } from './controllers/admins';
import { passwordMailsRouter } from './controllers/passwordMails';

mongoose.set('strictQuery', true);
mongoose.connect(MONGODB_URI)
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

    app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

    app.listen(PORT, () => {
      info(`🚀 Server is running on http://localhost:${PORT}`);
      info(`API documentation: http://localhost:${PORT}/doc`);
      info('connected to mongodb');
    });
  })
  .catch((err) => error('error connecting to mongodb', err.message));
