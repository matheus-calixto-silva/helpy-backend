import { model, Schema } from 'mongoose';

const categorySchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Nome é obrigatório'],
    minLength: 3,
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'Descrição é obrigatório'],
    minLength: 5,
  }
});

categorySchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const Category = model('Category', categorySchema);
