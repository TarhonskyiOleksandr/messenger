import { Router } from 'express';

import usersRouter from './users.routes';
import messagesRouter from './messages.routes'
import conversationsRouter from './conversations.routes';

const router = Router();

router.use('/user', usersRouter);
router.use('/messages', messagesRouter);
router.use('/conversations', conversationsRouter);

export default router;
