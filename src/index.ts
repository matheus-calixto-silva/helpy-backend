import 'dotenv/config';
import path from 'node:path';
import express from 'express';
import mongoose from 'mongoose';
import 'express-async-errors';
import { categoriesRouter } from './controllers/categories';
import { skillsRouter } from './controllers/skills';
import { usersRouter } from './controllers/users';
import { ongsRouter } from './controllers/ongs';
import { loginRouter } from './controllers/login';
import { MONGODB_URI, PORT } from './utils/config';
import { info, error } from './utils/logger';

mongoose.set('strictQuery', true);
mongoose.connect(MONGODB_URI)
  .then(() => {
    const app = express();
    const port = 3001;

    app.use(express.static('dist'));
    app.use(express.json());
    app.use(categoriesRouter);
    app.use(skillsRouter);
    app.use(usersRouter);
    app.use(ongsRouter);
    app.use(loginRouter);

    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

    app.listen(port, () => {
      info(`🚀 Server is running on http://localhost:${PORT}`);
      info('connected to mongodb');
    });
  })
  .catch((err) => error('error connecting to mongodb', err.message));
