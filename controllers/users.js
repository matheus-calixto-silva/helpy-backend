const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const multer = require('multer');
const multerConfig = require('../utils/multer');
const User = require('../models/user');
const Image = require('../models/image');

const onePhotoConfig = multer(multerConfig).single('photo');

const getUser = async (id) => {
  const user = await User.findById(id).populate('profilePic', { url: 1 });
  return user;
};

const getUsers = async (limit) => {
  const users = await User.find({})
    .populate('profilePic', { url: 1 })
    .limit(limit);
  return users;
};

const addProfilePicToUser = async (user, image) => {
  const { _id } = user;
  image.user = _id;
  user.profilePic = image._id;

  await User.findByIdAndUpdate(user._id.toString(), user, {
    new: true,
  });

  await Image.findByIdAndUpdate(image._id.toString(), image, {
    new: true,
  });

  const populatedUser = getUser(user._id);

  return populatedUser;
};

usersRouter.get('/', async (_request, response) => {
  const users = await getUsers(10);
  response.status(200).json(users);
});

usersRouter.post('/', onePhotoConfig, async (request, response) => {
  const { firstName, lastName, username, email, password, phone } =
    request.body;

  const { originalname: name, size, key, location: url = '' } = request.file;

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return response.status(400).json({
      error: 'nome de usuário deve ser único',
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    firstName,
    lastName,
    username,
    email,
    passwordHash,
    phone,
  });

  const savedUser = await user.save();

  const image = await Image.create({
    name,
    size,
    key,
    url,
  });

  const populatedUser = await addProfilePicToUser(savedUser, image);

  response.status(201).json(populatedUser);
});

usersRouter.get('/:id', async (request, response) => {
  const user = await getUser(request.params.id);
  response.status(200).json(user);
});

usersRouter.delete('/:id', async (request, response) => {
  const user = await getUser(request.params.id);
  const image = await Image.findById(user.profilePic._id.toString());

  await user.remove();
  await image.remove();

  response.status(204).send();
});

module.exports = usersRouter;
