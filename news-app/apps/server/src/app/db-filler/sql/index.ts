import { fillCategoryTable } from './db-filler.category';
import { fillPostTable } from './db-filler.post';
import { fillSubscriptionTable } from './db-filler.subscription';
import { fillTopicTable } from './db-filler.topic';
import { addBaseUsers } from './db-filler.user';
import { fillVoteTable } from './db-filler.votes';

export async function fillSqlDb() {
  await addBaseUsers();
  await fillCategoryTable();
  await fillSubscriptionTable();
  await fillTopicTable();
  await fillPostTable();
  await fillVoteTable();
}
