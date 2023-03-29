import { model, Schema } from 'mongoose';

const adminSchema = new Schema({
  firstname: {
    type: String,
    trim: true,
    required: [true, 'Nome é obrigatório'],
    minLength: 3,
  },
  lastname: {
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
      validator: (v: string) => {
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        );
      },
      message: 'o email informado não é válido!',
    },
  },
  phone: {
    type: String,
    trim: true,
    required: [true, 'Número de telefone é obrigatório'],
    validate: {
      validator: (v: string) => {
        return /^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/.test(
          v
        );
      },
      message: 'o número de telefone não é válido!',
    },
  },
  profilePic: {
    type: String,
    trim: true,
    required: true,
  },
  role: {
    type: String,
    trim: true,
    required: true,
  },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

adminSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

export const Admin = model('Admin', adminSchema);
