import { Router } from 'express';
import authRouter from './auth.router.js';
import postRouter from './post.router.js';
// import authRouter from './auth';

const router = Router();

router.use('/post', postRouter);
router.use('/auth', authRouter);

export default router;