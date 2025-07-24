import express from 'express';
import { verifyToken } from '../middleware/authJwt';
import { createCategory, getAllCategories, deleteCategory, editCategory } from '../controllers/category';
const categoryRouter = express.Router();

categoryRouter.post('/create', verifyToken, createCategory);
categoryRouter.get('/getAll', verifyToken, getAllCategories);
categoryRouter.delete('/delete', verifyToken, deleteCategory);
categoryRouter.patch('/edit', verifyToken, editCategory);

export default categoryRouter;