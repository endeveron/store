import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    cartPrice: {
      type: Number,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    products: [
      {
        color: {
          code: {
            type: String,
          },
          title: {
            type: String,
            required: true,
          },
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
      },
    ],
    shipping: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },

    totalPrice: {
      type: Number,
      required: true,
    },
    user: {
      _id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      email: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
  },
  {
    versionKey: false,
  }
);

const OrderModel = mongoose.model('Order', orderSchema);

export { OrderModel };
