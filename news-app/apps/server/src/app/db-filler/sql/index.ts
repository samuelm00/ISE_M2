import { addBaseUsers } from './db-filler.user';

export async function fillSqlDb() {
  await addBaseUsers();
}
