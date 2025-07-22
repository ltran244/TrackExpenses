import express from 'express';
import { verifyToken } from '../middleware/authJwt';
import { createCategories, getCategories, deleteCategories } from '../controllers/category';
const categoryRouter = express.Router();

categoryRouter.post('/create', verifyToken, createCategories);
categoryRouter.get('/', verifyToken, getCategories);
categoryRouter.delete('/delete', verifyToken, deleteCategories);
export default categoryRouter;