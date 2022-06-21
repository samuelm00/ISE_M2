import { Router } from 'express';
import {
  createUser,
  getAllUsers,
  getWrittenTopics,
} from '../../controllers/nosql/controller.nosql.user';
import { responseJson } from '../../util/util.response';

export const userRouterNoSql = Router();

userRouterNoSql.get('/users', getAllUsers);

userRouterNoSql.post('/users', (req, res) => {
  const { email, password } = req.body;
  createUser({ email, password })
    .then((user) => {
      if (user) {
        return res.status(200).json(responseJson({ payload: user }));
      }
      return res.status(400).json(responseJson({ error: 'User not created' }));
    })
    .catch((error) => {
      return res.status(400).json(responseJson({ error: error.message }));
    });
});

userRouterNoSql.get('/users/:id/topics', getWrittenTopics);
