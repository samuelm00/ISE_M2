import { IUserComplete, User } from '@news-app/api-model';
import { createUser } from '../../controllers/nosql/controller.nosql.user';

export async function addBaseUsers() {
  const users = await User.findAll();
  return Promise.all(users.map(async (user) => _createUser(user)));
}

/**
 *
 * @param nr
 * @returns
 */
async function _createUser(testUser: IUserComplete) {
  const user: Omit<IUserComplete, 'id'> = {
    email: testUser.email,
    password: testUser.password,
  };
  return createUser(user);
}
