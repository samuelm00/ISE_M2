import { Router } from 'express';
import { userRouterNoSql } from './nosql';
import { userRouterSql } from './sql';

export const apiRouter = Router();

/**
 * SQL
 */
apiRouter.use('/sql', userRouterSql);

/**
 * NOSQL
 */
apiRouter.use('/nosql', userRouterNoSql);
