import { IUserComplete } from '@news-app/api-model';
import { createUser } from '../../controllers/nosql/controller.nosql.user';
import { users } from '../sql/db-filler.user';

export async function addBaseUsers() {
  const users: any[] = [];
  for (let i = 1; i <= 4; i++) {
    users.push(await _createUser(i));
  }
  return users;
}

/**
 *
 * @param nr
 * @returns
 */
async function _createUser(nr: number) {
  const user: Omit<IUserComplete, 'id'> = {
    email: users[nr],
    password: 'password',
  };
  return createUser(user);
}
