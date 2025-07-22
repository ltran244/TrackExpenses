import express from 'express';
import { verifyToken } from '../middleware/authJwt';
import { getUserProfile, deleteUser, updateUserProfile, changePassword } from '../controllers/user';

const userRouter = express.Router();

userRouter.get('/profile', verifyToken, getUserProfile);
userRouter.delete('/delete', verifyToken, deleteUser);
userRouter.put('/update', verifyToken, updateUserProfile);
userRouter.put('/change-password', verifyToken, changePassword);
export default userRouter;