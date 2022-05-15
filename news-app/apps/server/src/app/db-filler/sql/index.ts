import { addBaseUsers } from './db-filler.use';

export async function fillSqlDb() {
  await addBaseUsers();
}
