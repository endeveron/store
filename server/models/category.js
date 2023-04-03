import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

// categorySchema.index({
//   name: 'text',
// });

const CategoryModel = mongoose.model('Category', categorySchema);

export { CategoryModel };
