import { Router } from 'express';
import {
  createCategory,
  getAllCategories,
  getCategoryByID,
} from '../../controllers/sql/controller.sql.category';

export const categoryRouterSql = Router();

categoryRouterSql.get('/categories', getAllCategories);

categoryRouterSql.get('/categories/:id', getCategoryByID);

categoryRouterSql.post('/categories', createCategory);
