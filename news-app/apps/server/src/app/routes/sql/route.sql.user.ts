import { Router } from 'express';
import {
  getAllUsers,
  createUser,
} from '../../controllers/sql/controller.sql.user';

export const userRouterSql = Router();

userRouterSql.get('/users', getAllUsers);

userRouterSql.post('/users', createUser);
