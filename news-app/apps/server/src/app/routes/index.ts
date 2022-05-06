import { Router } from 'express';
import { userRouterNoSql } from './nosql';
import { userRouterSql } from './sql';

export const apiRouter = Router();

/**
 * NOSQL
 */
apiRouter.use(userRouterNoSql);

/**
 * SQL
 */
apiRouter.use(userRouterSql);
