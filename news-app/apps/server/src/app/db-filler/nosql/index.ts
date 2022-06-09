import { fillCategoryTable } from './db-filler.category';
import { addBaseUsers } from './db-filler.user';

export async function fillNoSqlDb() {
  await addBaseUsers();
  await fillCategoryTable();
}
