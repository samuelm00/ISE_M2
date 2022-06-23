import { Router } from 'express';
import {
  getAllUsers,
  getWrittenTopics,
} from '../../controllers/nosql/controller.nosql.user';

export const userRouterNoSql = Router();

userRouterNoSql.get('/users', getAllUsers);

userRouterNoSql.get('/users/:id/topics', getWrittenTopics);
