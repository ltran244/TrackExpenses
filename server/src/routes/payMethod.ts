import express from 'express';
import { createPayMethod } from '../controllers/payMethod';
const payMethodRouter = express.Router();

payMethodRouter.put('/create', createPayMethod); 

export default payMethodRouter;