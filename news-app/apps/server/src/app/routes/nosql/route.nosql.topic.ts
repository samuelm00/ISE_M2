import { Router } from 'express';
import {
  getTopics,
  createTopic,
  getTopic,
} from '../../controllers/nosql/controller.nosql.topic';

export const topicRouterNoSql = Router();

topicRouterNoSql.get('/topic', getTopics);

topicRouterNoSql.get('/topic/:id', getTopic);

topicRouterNoSql.post('/topic', createTopic);
