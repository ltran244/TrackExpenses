import express from 'express';
import { verifyToken } from '../middleware/authJwt';
import { createTransaction, deleteTransaction, getAllTransactions, editTransaction} from '../controllers/transactions';
const transactionsRouter = express.Router();

transactionsRouter.post('/create', verifyToken, createTransaction);
transactionsRouter.get('/getAll', verifyToken, getAllTransactions);
transactionsRouter.delete('/delete', verifyToken, deleteTransaction);
transactionsRouter.patch('/edit', verifyToken, editTransaction);

export default transactionsRouter;

