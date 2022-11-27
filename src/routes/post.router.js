import { Router } from 'express';
import { createPost, getPost, toggleLikePost, toggleSavedPost } from '../controller/post.controller.js';
// import jwtAuth from '../middleware/jwtAuth.js';

const postRouter = Router();

postRouter.get('/', getPost);
postRouter.post('/create', createPost);
postRouter.post('/togglelike/:id', toggleLikePost);
postRouter.post('/togglesave/:id', toggleSavedPost);


export default postRouter;