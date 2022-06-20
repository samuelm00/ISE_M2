import { IUserComplete, User } from '@news-app/api-model';
import { faker } from '@faker-js/faker';

const users: Omit<IUserComplete,"id">[] = [];
export let userSql: User[];

export async function addBaseUsers() {
  generateRandomUsers();
  userSql = await User.bulkCreate(users)
}


function generateRandomUsers() {
  const numberOfUsers = Math.floor(Math.random() * 3)+4;

  Array.from({ length: numberOfUsers }).forEach(() => {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password()
    }
    users.push(user);
  });
}
