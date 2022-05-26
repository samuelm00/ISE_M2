import { Router } from 'express';
import { userRouterNoSql } from './nosql';
import { userRouterSql, categoryRouterSql } from './sql';
import { topicRouter } from './sql/route.sql.topic';

export const apiRouter = Router();

/**
 * SQL
 */
apiRouter.use('/sql', userRouterSql);
apiRouter.use('/sql', categoryRouterSql);
apiRouter.use('/sql', topicRouter);

/**
 * NOSQL
 */
apiRouter.use('/nosql', userRouterNoSql);
