import { fillCategoryTable } from './db-filler.category';
import { fillPostTable } from './db-filler.post';
import { fillSubscriptionTable } from './db-filler.subscription';
import { fillTopicTable } from './db-filler.topic';
import { migrateBaseUsers } from './db-filler.user';

export async function fillNoSqlDb() {
    await migrateBaseUsers();
    await fillCategoryTable();
    await fillSubscriptionTable();
    await fillTopicTable();
    await fillPostTable();
}
