import express from 'express';
import { verifyToken } from '../middleware/authJwt';
import { getUserProfile, deleteUser } from '../controllers/user';

const userRouter = express.Router();

userRouter.get('/profile', verifyToken, getUserProfile);
userRouter.delete('/delete', verifyToken, deleteUser);
export default userRouter;