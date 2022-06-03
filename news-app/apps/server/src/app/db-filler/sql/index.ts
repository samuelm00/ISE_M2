import { fillCategoryTable } from './db-filler.category';
import { addBaseUsers } from './db-filler.user';

export async function fillSqlDb() {
  await addBaseUsers();
  await fillCategoryTable();
}
