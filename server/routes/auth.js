import express from 'express';
import { body } from 'express-validator';

import {
  signup,
  login,
  // logout
} from '../controllers/auth.js';

const router = express.Router();

router.post(
  '/signup',
  [
    body('name').isLength({ min: 2, max: 20 }),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 1, max: 30 }),
  ],
  signup
);

router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 1, max: 30 }),
  ],
  login
);

// router.get('/logout/:userId',
//   logout
// )

const authRoutes = router;

export { authRoutes };
