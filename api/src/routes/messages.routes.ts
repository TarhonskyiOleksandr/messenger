import { Router } from 'express';

import {
  readMessage,
  sendMessage,
} from '../controllers/messages';
import { verifyToken } from '../middlewares';

const router = Router();

router.post('/send/:id', verifyToken, sendMessage);
router.put('/read', verifyToken, readMessage);

export default router;
