import { Router } from 'express';
import {
  getAllCategories,
  getCategoryByID,
} from '../../controllers/sql/controller.sql.category';

export const categoryRouterSql = Router();

categoryRouterSql.get('/categories', getAllCategories);

categoryRouterSql.get('/categories/:id', getCategoryByID);

