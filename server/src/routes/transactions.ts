import express from 'express';
import { verifyToken } from '../middleware/authJwt';
import { createTransaction, deleteTransaction, getTransactions, editTransaction} from '../controllers/transactions';
const transactionsRouter = express.Router();

transactionsRouter.post('/create', verifyToken, createTransaction);
transactionsRouter.get('/get', verifyToken, getTransactions);
transactionsRouter.delete('/delete', verifyToken, deleteTransaction);
transactionsRouter.patch('/edit', verifyToken, editTransaction);

export default transactionsRouter;

