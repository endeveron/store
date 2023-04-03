import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
    colors: [
      {
        code: {
          type: String,
          required: true,
        },
        images: [
          {
            type: String,
            required: true,
          },
        ],
        title: {
          type: String,
          required: true,
        },
      },
    ],
    description: {
      type: String,
      required: true,
    },
    likes: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    specification: {
      short: {
        type: String,
        required: true,
      },
      full: {
        type: String,
        required: true,
      },
    },
  },
  {
    versionKey: false,
  }
);

productSchema.index({
  name: 'text',
});

const ProductModel = mongoose.model('Product', productSchema);

export { ProductModel };
