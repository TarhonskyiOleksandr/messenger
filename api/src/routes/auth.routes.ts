import { Router } from 'express';

import {
  register,
  login,
  logout,
} from '../controllers/auth';
import { verifyToken } from '../middlewares';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', verifyToken, logout);

export default router;
