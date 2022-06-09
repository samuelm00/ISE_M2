import { Router } from 'express';
import {
  getAllCategories,
  createCategory,
  getCategoryByID,
} from '../../controllers/nosql/controller.nosql.category';

export const categoryRouterSql = Router();

categoryRouterSql.get('/categories', getAllCategories);

categoryRouterSql.get('/categories/:id', getCategoryByID);

categoryRouterSql.post('/categories', createCategory);
