import { Router } from 'express';
import {
  getAllUsers,
  createUser,
  getWrittenTopics,
} from '../../controllers/sql/controller.sql.user';
import { responseJson } from '../../util/util.response';

export const userRouterSql = Router();

userRouterSql.get('/users', getAllUsers);

userRouterSql.post('/users', (req, res) => {
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

userRouterSql.get('/users/:id/topics', getWrittenTopics);
