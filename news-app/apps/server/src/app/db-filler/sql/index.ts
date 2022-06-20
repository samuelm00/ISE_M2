import { fillCategoryTable } from './db-filler.category';
import { fillSubscriptionTable } from './db-filler.subscription';
import { addBaseUsers } from './db-filler.user';

export async function fillSqlDb() {
  await addBaseUsers();
  await fillCategoryTable();
  await fillSubscriptionTable();
}
