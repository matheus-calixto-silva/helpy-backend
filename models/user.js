const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'Nome é obrigatório'],
    minLength: 3,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Sobrenome é obrigatório'],
    minLength: 3,
  },
  username: {
    type: String,
    trim: true,
    required: [true, 'Nome de usuário é obrigatório'],
    minLength: 3,
  },
  passwordHash: {
    type: String,
    trim: true,
    required: [true, 'Senha é obrigatório'],
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'Email é obrigatório'],
    validate: {
      validator: (v) => {
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        );
      },
      message: (props) => `${props.value} não é um email válido!`,
    },
  },
  phone: {
    type: String,
    trim: true,
    required: [true, 'Número de telefone é obrigatório'],
    validate: {
      validator: (v) => {
        return /^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/.test(
          v
        );
      },
      message: (props) => `${props.value} não é um número de telefone válido!`,
    },
  },
  profilePic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image',
  },
});

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
