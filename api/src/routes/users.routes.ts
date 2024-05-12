import { Router } from 'express';

import {
  register,
  login,
  getCurrentUser,
  logout
} from '../controllers/users';
import { verifyToken } from '../middlewares';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', verifyToken, getCurrentUser);
router.post('/logout', verifyToken, logout);

export default router;
