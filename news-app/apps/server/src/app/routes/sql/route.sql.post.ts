import { Router } from 'express';
import {createPost,getPostsOfTheme} from '../../controllers/sql/controller.sql.post'

export const postRouterSql = Router();

postRouterSql.get("/sql/posts/:id",getPostsOfTheme);

postRouterSql.post("/sql/posts",createPost);