import { IUserComplete } from '@news-app/api-model';
import { createUser } from '../../controllers/sql/controller.sql.user';
import { faker } from '@faker-js/faker';

export const users: IUserComplete[] = [];

export async function addBaseUsers() {
  generateRandomUsers();
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

function generateRandomUsers() {
  const numberOfUsers = Math.floor(Math.random() * 4)+1;

  Array.from({ length: numberOfUsers }).forEach(() => {
    const user = {
      id: 0,
      email: faker.internet.email(),
      password: faker.internet.password()
    }
    users.push(user);
  });
}
