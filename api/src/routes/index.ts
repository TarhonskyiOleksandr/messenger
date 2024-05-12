import { Router } from 'express';

import usersRouter from './users.routes';

const router = Router();

router.use('/user', usersRouter);

export default router;
