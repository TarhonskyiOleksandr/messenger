import { Router } from 'express';

import authRouter from './auth.routes';
import usersRouter from './users.routes';
import messagesRouter from './messages.routes'
import conversationsRouter from './conversations.routes';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/messages', messagesRouter);
router.use('/conversations', conversationsRouter);

export default router;
