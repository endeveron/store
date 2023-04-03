import cors from 'cors';
import express from 'express';
import path from 'path';

import { authRoutes, orderRoutes, productRoutes } from './routes/index.js';

import {
  corsOptions,
  errorController,
  notFoundController,
} from './controllers/index.js';

import { mongo } from './db/mongo.js';
import { logger } from './utils/index.js';

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

// serve files statically
app.use('/uploads/images', express.static(path.join('uploads', 'images')));

// routes
app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);
app.use('/api/order', orderRoutes);

app.use('/ping', (_, res) => {
  res.status(200).send({
    message: 'OK',
  });
});

// 404
app.use(notFoundController);

// handle errors
app.use(errorController);

// connect to db
mongo
  .connect()
  .then(() => app.listen(process.env.PORT))
  .catch((err) => logger.r(err));
