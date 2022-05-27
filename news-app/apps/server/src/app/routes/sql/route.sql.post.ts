import { Router } from 'express';
import {createPost,getPostsOfTheme} from '../../controllers/sql/controller.sql.post'

export const postRouterSql = Router();

postRouterSql.get("/posts/:id",getPostsOfTheme);

postRouterSql.post("/posts",createPost);