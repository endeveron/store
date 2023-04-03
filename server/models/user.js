import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    account: {
      name: {
        type: String,
        maxlength: 20,
        text: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        minlength: 6,
        required: true,
      },
    },
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model('User', userSchema);

export { UserModel };
