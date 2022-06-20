import { fillCategoryTable } from './db-filler.category';
import { fillSubscriptionTable } from './db-filler.subscription';
import { fillTopicTable } from './db-filler.topic';
import { migrateBaseUsers } from './db-filler.user';

export async function fillNoSqlDb() {
  try {
    await migrateBaseUsers();
    await fillCategoryTable();
    await fillSubscriptionTable();
    await fillTopicTable();
  } catch (error) {
    console.log(error);
  }
}
