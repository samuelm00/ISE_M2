import { Router } from 'express';
import { getAllCategories, getCategoryByID } from '../../controllers/sql/controller.sql.category';

export const categoryRouterSql = Router();

categoryRouterSql.get("/sql/categories",getAllCategories);

categoryRouterSql.get("/sql/categories/:id",getCategoryByID);
