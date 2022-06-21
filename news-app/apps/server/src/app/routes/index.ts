import { Router } from 'express';
import { connection } from 'mongoose';
import { fillNoSqlDb } from '../db-filler/nosql';
import { responseJson } from '../util/util.response';
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
  //voteRouterSql,
} from './sql';

export const apiRouter = Router();

/**
 * SQL
 */
apiRouter.use('/sql', userRouterSql);
apiRouter.use('/sql', categoryRouterSql);
apiRouter.use('/sql', topicRouter);
apiRouter.use('/sql', postRouterSql);
//apiRouter.use('/sql', voteRouterSql);

/**
 * NOSQL
 */
apiRouter.use('/nosql', userRouterNoSql);
apiRouter.use('/nosql', categoryRouterNoSql);
apiRouter.use('/nosql', topicRouterNoSql);
apiRouter.use('/noSql', postRouterNoSql);
apiRouter.get('/noSql/migration', async (req,res) => {
  try {
    await connection.db.dropCollection('users');
    await connection.db.dropCollection('discussioncategories');
    await connection.db.dropCollection('discussionposts');
    await connection.db.dropCollection('discussiontopics');
    await fillNoSqlDb();
    return res.sendStatus(200);
  }catch (error) {
    return res.status(404).json(responseJson({ error: error.message }));
  }
});
