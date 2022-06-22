import { Router } from 'express';
import {
  getAllCategories,
  //createCategory,
  getCategoryByID,
} from '../../controllers/nosql/controller.nosql.category';

export const categoryRouterNoSql = Router();

categoryRouterNoSql.get('/categories', getAllCategories);

categoryRouterNoSql.get('/categories/:id', getCategoryByID);

//categoryRouterNoSql.post('/categories', createCategory);
