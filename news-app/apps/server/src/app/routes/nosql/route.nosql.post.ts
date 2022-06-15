import { Router } from 'express';
import {
  createPost,
  getPostsOfTheme,
  getRepliesOfPost,
} from '../../controllers/nosql/controller.nosql.post';

export const postRouterNoSql = Router();

postRouterNoSql.get('/posts/:id', getPostsOfTheme);

postRouterNoSql.get('/posts/:id/:postId', getRepliesOfPost);

postRouterNoSql.post('/posts', createPost);
