import { Router } from 'express';
// import jwtAuth from '../middleware/jwtAuth.js';
import authRouter from './auth.router.js';
import postRouter from './post.router.js';
import userRouter from './user.router.js';
// import authRouter from './auth';

const router = Router();

router.use('/post', postRouter);
router.use('/auth', authRouter);
router.use('/user', userRouter);

export default router;