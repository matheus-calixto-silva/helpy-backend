import { model, Schema } from 'mongoose';
import { IEvent } from '../types';

const eventSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Nome é obrigatório'],
    minLength: 5
  },
  address: {
    street: {
      type: String,
      trim: true,
      required: [true, 'Rua é obrigatória']
    },
    city: {
      type: String,
      trim: true,
      required: [true, 'Cidade é obrigatória']
    },
    uf: {
      type: String,
      trim: true,
      required: [true, 'UF é obrigatória'],
      length: 2,
    },
    latitude: {
      type: String,
      required: [true, 'Latitude é obrigatória']
    },
    longitude: {
      type: String,
      required: [true, 'Longitude é obrigatória']
    }
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'Descrição do evento é obrigatório'],
    minLength: 5,
  },
  date: {
    type: Date,
    required: [true, 'Data do evento é obrigatório']
  },
  requiredSkills: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Skill',
      required: true
    }],
  },
  maxVolunteers: {
    type: Number,
    required: [true, 'Número de voluntários é obrigatório']
  },
  volunteers: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: function (this: IEvent) {
        return this.volunteers.length >= this.maxVolunteers
          && 'Máximo de voluntários para esse evento foi atingido';
      }
    }],
  },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

eventSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    delete returnedObject.__v;
  },
});

export const Event = model('Event', eventSchema);
