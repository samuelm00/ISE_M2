import { Router } from 'express';
import {
  getAllUsers,
  getWrittenTopics,
} from '../../controllers/sql/controller.sql.user';

export const userRouterSql = Router();

userRouterSql.get('/users', getAllUsers);

userRouterSql.get('/users/:id/topics', getWrittenTopics);
