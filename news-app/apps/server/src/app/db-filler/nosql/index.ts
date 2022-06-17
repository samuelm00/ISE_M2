import { fillCategoryTable } from './db-filler.category';
import { addBaseUsers } from './db-filler.user';

export async function fillNoSqlDb() {
  try {
    await addBaseUsers();
    await fillCategoryTable();
  } catch (error) {
    console.log(error);
  }
}
