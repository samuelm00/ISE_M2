import { Router } from 'express';
import { getAllUsers } from '../../controllers/sql/controller.sql.user';

export const userRouterSql = Router();

userRouterSql.get('/users', getAllUsers);
