import express from 'express';
import { verifyToken } from '../middleware/authJwt';
import { createCategory, getCategory, deleteCategory } from '../controllers/category';
const categoryRouter = express.Router();

categoryRouter.post('/create', verifyToken, createCategory);
categoryRouter.get('/', verifyToken, getCategory);
categoryRouter.delete('/delete', verifyToken, deleteCategory);
export default categoryRouter;