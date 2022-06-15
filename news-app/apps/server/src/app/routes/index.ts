import { Router } from 'express';
import {
  userRouterNoSql,
  categoryRouterNoSql,
  topicRouterNoSql,
  postRouterNoSql,
} from './nosql';
import {
  userRouterSql,
  categoryRouterSql,
  postRouterSql,
  topicRouter,
  voteRouterSql,
} from './sql';

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
apiRouter.use('/nosql', categoryRouterNoSql);
apiRouter.use('/nosql', topicRouterNoSql);
apiRouter.use('/noSql', postRouterNoSql);
