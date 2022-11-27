import { Router } from 'express';
import { login, register, sendOtp, verifyOtp } from '../controller/auth.controller.js';
// import jwtAuth from '../middleware/jwtAuth.js';

const authRouter = Router();

// authRouter.post('/login', login);
authRouter.post('/login', login);
authRouter.post('/register', register);
authRouter.post('/sendOtp', sendOtp);
authRouter.post('/verifyOtp', verifyOtp);


export default authRouter;