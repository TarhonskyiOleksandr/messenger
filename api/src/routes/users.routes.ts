import { Router } from 'express';

import {
  getCurrentUser,
  updateUser,
  usersSearch,
} from '../controllers/users';
import { verifyToken } from '../middlewares';

const router = Router();

router.get('/me', verifyToken, getCurrentUser);
router.patch('/me/update', verifyToken, updateUser);
router.post('/search', verifyToken, usersSearch);

export default router;
