import { Router } from 'express';
import { userRouterNoSql } from './nosql';
import { userRouterSql, categoryRouterSql, postRouterSql, topicRouter, voteRouterSql } from './sql';

export const apiRouter = Router();

/**
 * SQL
 */
apiRouter.use('/sql', userRouterSql);
apiRouter.use('/sql', categoryRouterSql);
apiRouter.use('/sql', topicRouter);
apiRouter.use('/sql', postRouterSql);
apiRouter.use('/sql', voteRouterSql);

/**
 * NOSQL
 */
apiRouter.use('/nosql', userRouterNoSql);
