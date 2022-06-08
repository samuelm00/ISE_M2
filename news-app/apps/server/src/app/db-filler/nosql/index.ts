import { addBaseUsers } from './db-filler.user';

export async function fillNoSqlDb() {
  await addBaseUsers();
}
