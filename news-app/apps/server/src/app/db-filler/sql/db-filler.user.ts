import { IUserComplete, User } from '@news-app/api-model';
import { faker } from '@faker-js/faker';

const users: Omit<IUserComplete,"id">[] = [];

export async function addBaseUsers() {
  generateRandomUsers();
  return await User.bulkCreate(users);
}


function generateRandomUsers() {
  const numberOfUsers = Math.floor(Math.random() * 2)+3;

  Array.from({ length: numberOfUsers }).forEach(() => {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password()
    }
    users.push(user);
  });
}
