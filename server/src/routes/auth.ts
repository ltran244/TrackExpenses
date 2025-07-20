import express from 'express';
import {test, register, login, deleteUser, logout} from '../controllers/auth'

const authRouter = express.Router();

authRouter.get('/test', test);
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.delete('/delete/:id', deleteUser);

export default authRouter;