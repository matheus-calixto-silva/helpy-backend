const imagesRouter = require('express').Router();
const multer = require('multer');
const multerConfig = require('../utils/multer');
const Image = require('../models/image');

imagesRouter.get('/', async (_request, response) => {
  const images = await Image.find({});
  return response.status(200).json(images);
});

imagesRouter.post(
  '/',
  multer(multerConfig).single('photo'),
  async (request, response) => {
    const { originalname: name, size, key, location: url = '' } = request.file;

    const image = await Image.create({
      name,
      size,
      key,
      url,
    });

    return response.status(201).json(image);
  }
);

imagesRouter.get('/:id', async (request, response) => {
  const user = await Image.findById(request.params.id);
  response.status(200).json(user);
});

imagesRouter.delete('/:id', async (request, response) => {
  const post = await Image.findById(request.params.id);

  await post.remove();

  return response.status(204).send();
});

module.exports = imagesRouter;
