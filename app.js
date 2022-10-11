const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const path = require('path');
const usersRouter = require('./controllers/users');
const imagesRouter = require('./controllers/images');
const middleware = require('./utils/middleware');
const { info, error } = require('./utils/logger');
const mongoose = require('mongoose');
info('connecting to', config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    info('connected to MongoDB');
  })
  .catch((err) => {
    error('error connecting to MongoDB:', err.message);
  });

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(middleware.requestLogger);

app.use('/api/users', usersRouter);
app.use('/api/images', imagesRouter);

app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
