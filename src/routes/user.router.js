import { Router } from 'express';
import { changePassword, editUser, followUser, getUser, getUsers, unFollowUser } from '../controller/user.controller.js';


const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', getUser);
userRouter.put('/:id/follow', followUser);
userRouter.put('/:id/unfollow', unFollowUser);
userRouter.put('/edit/:id', editUser);
userRouter.put('/changepassword/:id', changePassword);
// userRouter.put('/:id/block', blockUser);



export default userRouter;