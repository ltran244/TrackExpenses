import express from 'express';
import { createPayMethod, deletePayMethod, getAllPayMethods, editPayMethod } from '../controllers/payMethod';
import { verifyToken } from '../middleware/authJwt';
const payMethodRouter = express.Router();

payMethodRouter.post('/create', verifyToken, createPayMethod); 
payMethodRouter.delete('/delete', verifyToken, deletePayMethod);
payMethodRouter.get('/getAll', verifyToken, getAllPayMethods);
payMethodRouter.patch('/edit', verifyToken, editPayMethod);

export default payMethodRouter;