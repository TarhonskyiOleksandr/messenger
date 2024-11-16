import { Router } from 'express';

import {
  getConversations,
  getConversation,
} from '../controllers/conversations';
import { verifyToken } from '../middlewares';

const router = Router();

/**
 * @swagger
 * /conversations/all:
 *   post:
 *     summary: All conversations of current user
 *     description: Get all users conversations.
 *     tags:
 *       - Conversations
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
router.get('/all', verifyToken, getConversations);

router.get('/:id', verifyToken, getConversation);

export default router;
