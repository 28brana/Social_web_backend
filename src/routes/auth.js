import { Router } from 'express';
// import { login } from '../../controller/auth.controller';

const authRouter = Router();

// authRouter.post('/login', login);
authRouter.get('/login', login);


export default authRouter;