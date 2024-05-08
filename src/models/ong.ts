import { model, Schema } from 'mongoose';

const ongSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Nome é obrigatório'],
      minLength: 3,
    },
    username: {
      type: String,
      trim: true,
      required: [true, 'Nome é obrigatório'],
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
            v,
          );
        },
        message: (props: { value: string }) =>
          `${props.value} não é um email válido!`,
      },
    },
    phone: {
      type: String,
      trim: true,
      required: [true, 'Número de telefone é obrigatório'],
      validate: {
        validator: (v: string) => {
          return /^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/.test(
            v,
          );
        },
        message: (props: { value: string }) =>
          `${props.value} não é um número de telefone válido!`,
      },
    },
    address: {
      type: String,
      trim: true,
      required: [true, 'Endereço da sede é obrigatório'],
      minLength: 10,
    },
    cnpj: {
      type: String,
      trim: true,
      required: [true, 'CNPJ é obrigatório'],
      validate: {
        validator: (v: string) => {
          return /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(v);
        },
        message: (props: { value: string }) =>
          `${props.value} não é um CNPJ válido`,
      },
    },
    maxEvents: {
      type: Number,
      required: [true, 'Número de eventos é obrigatório'],
    },
    events: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Event',
      },
    ],
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
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

ongSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

export const Ong = model('Ong', ongSchema);
