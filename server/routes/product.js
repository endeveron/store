import express from 'express';
import { body } from 'express-validator';

import {
  getCategories,
  getCategoryProducts,
  createCategory,
  getProduct,
  getProducts,
  createProduct,
  deleteProduct,
  searchProduct,
} from '../controllers/product.js';

import { checkAuth } from '../middleware/check-auth.js';

const router = express.Router();

router.get('/', getProducts);

router.get('/category', getCategories);

router.get('/category/:id', getCategoryProducts);

router.get('/search/:query', searchProduct);

router.get('/:id', getProduct);

router.post(
  '/',
  [
    body('title').notEmpty(),
    body('categories').isArray(),
    body('colors').isArray(),
    body('description').notEmpty(),
    body('likes').isArray(),
    body('price').isDecimal(),
    body('specification.short').notEmpty(),
    body('specification.full').notEmpty(),
    body('rate').isDecimal(),
  ],
  createProduct
);

router.post(
  '/category/',
  [body('icon').notEmpty(), body('title').notEmpty()],
  createCategory
);

// // protected routes (token required)
// router.use(checkAuth);

router.delete('/:id', deleteProduct);

const productRoutes = router;

export { productRoutes };
