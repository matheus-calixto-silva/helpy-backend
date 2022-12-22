import { model, Schema } from 'mongoose';

import { IUser } from './user';
import { ISkill } from './skill';

export interface IEvent {
  name: string;
  local: string;
  date: Date;
  description: string;
  requiredSkills: ISkill[];
  maxVolunteers: number;
  volunteers: IUser[];
}

const eventSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Nome é obrigatório'],
    minLength: 5
  },
  local: {
    type: String,
    trim: true,
    required: [true, 'Local do evento é obrigatório'],
    minLength: 5,
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
});

eventSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const Event = model('Event', eventSchema);
