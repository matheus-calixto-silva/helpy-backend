import { model, Schema } from 'mongoose';

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
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

skillSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    delete returnedObject.__v;
  },
});

export const Skill = model('Skill', skillSchema);
