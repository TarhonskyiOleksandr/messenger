import { Router } from 'express';

import {
  getConversations,
  getConversation,
} from '../controllers/conversations';
import { verifyToken } from '../middlewares';

const router = Router();

router.get('/all', verifyToken, getConversations);
router.get('/:id', verifyToken, getConversation);

export default router;
