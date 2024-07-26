import { Router } from 'express';

import {
  readMessage,
  sendMessage,
  deleteMessage,
} from '../controllers/messages';
import { verifyToken } from '../middlewares';

const router = Router();

router.post('/send/:id', verifyToken, sendMessage);
router.put('/read', verifyToken, readMessage);
router.delete('/delete/:id', verifyToken, deleteMessage);

export default router;
