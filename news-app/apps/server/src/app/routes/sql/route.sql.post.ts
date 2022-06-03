import { Router } from 'express';
import {createPost,getPostsOfTheme,getRepliesOfPost} from '../../controllers/sql/controller.sql.post'

export const postRouterSql = Router();

postRouterSql.get("/posts/:id",getPostsOfTheme);

postRouterSql.get("/posts/:id/:postId",getRepliesOfPost);

postRouterSql.post("/posts",createPost);