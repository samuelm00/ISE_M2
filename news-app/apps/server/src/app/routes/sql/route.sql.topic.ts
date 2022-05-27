import { Router } from 'express';
import {
  getTopics,
  createTopic,
  getTopic,
} from '../../controllers/sql/controller.sql.topic';

export const topicRouter = Router();

topicRouter.get('/topic', getTopics);

topicRouter.get('/topic/:id', getTopic);

topicRouter.post('/topic', createTopic);
