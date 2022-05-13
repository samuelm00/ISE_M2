import { User } from '@news-app/api-model';
import { Router } from 'express';

export const userRouterSql = Router();

userRouterSql.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: "Couldn't get users" });
  }
});
