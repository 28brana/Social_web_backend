import { Router } from 'express';
import { createComment, createPost, getComment, getPost, report, toggleLikePost, toggleSavedPost } from '../controller/post.controller.js';
// import jwtAuth from '../middleware/jwtAuth.js';

const postRouter = Router();

postRouter.get('/', getPost);
postRouter.get('/:id/comment', getComment);
postRouter.post('/create', createPost);
postRouter.post('/:id/toggleLike', toggleLikePost);
postRouter.post('/:id/toggleSaved', toggleSavedPost);
postRouter.post('/:id/comment', createComment);
postRouter.post('/:id/report', report);


export default postRouter;