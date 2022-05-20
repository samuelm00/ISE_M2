import { IUserComplete, User } from '@news-app/api-model';
import { createUser } from '../../controllers/sql/controller.sql.user';

const users = [
  'alex@mail.com',
  'lisa@mail.com',
  'noah@mail.com',
  'markus@mail.com',
];

export async function addBaseUsers() {
  const users: User[] = [];
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
