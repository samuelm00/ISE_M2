import { User, UserNoSql } from '@news-app/api-model';

export const usersIdMap = new Map();

export async function migrateBaseUsers() {
  const users = await User.findAll();
  return Promise.all(users.map(async (user) => {
    const userNoSql = await UserNoSql.create({
        email: user.email,
        password: user.password,
        subscriptions: []
      });
      usersIdMap.set(user.id, userNoSql._id);
      return user;
  }));
}

