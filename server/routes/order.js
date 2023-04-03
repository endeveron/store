import express from 'express';
import { body } from 'express-validator';

import { createOrder, getOrder, getOrders } from '../controllers/order.js';

import { checkAuth } from '../middleware/check-auth.js';

const router = express.Router();

router.get('/user/:id', getOrders);

// protected routes (token required)
router.use(checkAuth);

// router.get('/user/:userId', getOrders);

router.get('/:id', getOrder);

router.post(
  '/',
  [
    body('cartPrice').isInt(),
    body('products').isArray(),
    body('shipping.address').notEmpty(),
    body('shipping.city').notEmpty(),
    body('shipping.price').isInt(),
    body('totalPrice').isInt(),
    body('user.email').notEmpty(),
    body('user.name').notEmpty(),
  ],
  createOrder
);

const orderRoutes = router;

export { orderRoutes };
