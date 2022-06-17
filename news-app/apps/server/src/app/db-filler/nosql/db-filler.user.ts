import { IUserComplete } from '@news-app/api-model';
import { createUser } from '../../controllers/nosql/controller.nosql.user';
import { users } from '../sql/db-filler.user';

export async function addBaseUsers() {
  return Promise.all(users.map(async (email) => _createUser(email)));
}

/**
 *
 * @param nr
 * @returns
 */
async function _createUser(email: string) {
  const user: Omit<IUserComplete, 'id'> = {
    email: email,
    password: 'password',
  };
  return createUser(user);
}
