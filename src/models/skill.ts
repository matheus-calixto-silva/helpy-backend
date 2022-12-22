import { model, Schema } from 'mongoose';

import { ICategory } from './category';
export interface ISkill {
  name: string
  category: ICategory
}

const skillSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'nome é obrigatório'],
    minLength: 3,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }
});

skillSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const Skill = model('Skill', skillSchema);
