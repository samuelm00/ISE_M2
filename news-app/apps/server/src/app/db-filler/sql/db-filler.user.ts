import { IUserComplete, User } from '@news-app/api-model';
import { createUser } from '../../controllers/sql/controller.sql.user';

export const users = [
  'alex@mail.com',
  'lisa@mail.com',
  'noah@mail.com',
  'markus@mail.com',
];

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
