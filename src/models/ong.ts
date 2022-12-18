import { model, Schema } from 'mongoose';
import { IEvent } from './event';

export interface OngInterface {
  name: string;
  username: string;
  passwordHash: string;
  email: string;
  phone: string;
  address: string;
  cnpj: string;
  maxEvents: number;
  profilePic: string;
  events: IEvent[]
}

const ongSchema = new Schema<OngInterface>({
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
          v
        );
      },
      message: (props: { value: string }) => `${props.value} não é um email válido!`,
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
      message: (props: { value: string; }) => `${props.value} não é um número de telefone válido!`,
    },
  },
  address: {
    type: String,
    trim: true,
    required: [true, 'Endereço da sede é obrigatório'],
    minLength: 10
  },
  cnpj: {
    type: String,
    trim: true,
    required: [true, 'CNPJ é obrigatório'],
    validate: {
      validator: (v: string) => {
        return /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(v);
      },
      message: (props: { value: string; }) => `${props.value} não é um CNPJ válido`
    }
  },
  maxEvents: {
    type: Number,
    required: [true, 'Número de eventos é obrigatório']
  },
  events: {
    registeredEvents: {
      type: [{
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: function (this: OngInterface) {
          return this.events.length >= this.maxEvents
            && 'Máximo de eventos para essa ONG foi atingido';
        }
      }],
    },
  },
  profilePic: {
    type: String,
    trim: true,
    required: true,
  }
});

ongSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

export const Ong = model('Ong', ongSchema);
