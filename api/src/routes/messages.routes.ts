import { Router } from 'express';

import {
  sendMessage,
} from '../controllers/messages';
import { verifyToken } from '../middlewares';

const router = Router();

router.post('/send/:id', verifyToken, sendMessage);

export default router;
