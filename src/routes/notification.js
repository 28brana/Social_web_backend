import { Router } from 'express';
// import jwtAuth from '../middleware/jwtAuth.js';

const postRouter = Router();

postRouter.get('/:id', getPost);



export default postRouter;