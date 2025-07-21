import express from 'express';
import {register, login, deleteUser, logout} from '../controllers/auth'

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.delete('/delete/:id', deleteUser);

export default authRouter;