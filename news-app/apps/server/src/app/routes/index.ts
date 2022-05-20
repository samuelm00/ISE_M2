import { Router } from 'express';
import { userRouterNoSql } from './nosql';
import { userRouterSql, categoryRouterSql } from './sql';

export const apiRouter = Router();

/**
 * SQL
 */
apiRouter.use('/sql', userRouterSql);
apiRouter.use('/sql', categoryRouterSql);

/**
 * NOSQL
 */
apiRouter.use('/nosql', userRouterNoSql);
