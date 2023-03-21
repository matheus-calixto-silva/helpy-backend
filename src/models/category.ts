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
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

categorySchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    delete returnedObject.__v;
  },
});

export const Category = model('Category', categorySchema);
