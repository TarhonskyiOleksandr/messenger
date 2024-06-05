import { Router } from 'express';

import {
  register,
  login,
  getCurrentUser,
  logout,
  updateUser,
} from '../controllers/users';
import { verifyToken } from '../middlewares';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', verifyToken, getCurrentUser);
router.patch('/me/update', verifyToken, updateUser)
router.post('/logout', verifyToken, logout);

export default router;
