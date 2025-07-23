import express from 'express';
import { createPayMethod, deletePayMethod, getPayMethod } from '../controllers/payMethod';
import { verifyToken } from '../middleware/authJwt';
const payMethodRouter = express.Router();

payMethodRouter.post('/create', verifyToken, createPayMethod); 
payMethodRouter.delete('/delete', verifyToken, deletePayMethod);
payMethodRouter.get('/', verifyToken, getPayMethod);

export default payMethodRouter;