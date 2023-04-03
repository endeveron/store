import mongoose from 'mongoose';

import { logger } from '../utils/index.js';

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
// const uri = 'mongodb://localhost:27017/shop';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const mongo = {
  connect: async () => {
    try {
      await mongoose.connect(uri, options);
      logger.g(' ✓  Connected to database');
    } catch (err) {
      logger.r(' ✕  Database connection error', err);
    }
  },
};

export { mongo };
