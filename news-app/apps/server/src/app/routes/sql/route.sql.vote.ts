import { Router } from "express";
import { getVotesOfPost } from "../../controllers/sql/controller.sql.vote";

export const voteRouterSql = Router();

voteRouterSql.get("/votes/:id", getVotesOfPost);