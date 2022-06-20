import { fillCategoryTable } from './db-filler.category';
import { fillSubscriptionTable } from './db-filler.subscription';
import { migrateBaseUsers } from './db-filler.user';

export async function fillNoSqlDb() {
  try {
    await migrateBaseUsers();
    await fillCategoryTable();
    await fillSubscriptionTable();
  } catch (error) {
    console.log(error);
  }
}
