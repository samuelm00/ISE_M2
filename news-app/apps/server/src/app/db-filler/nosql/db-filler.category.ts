import { DiscussionCategoryNoSql } from '@news-app/api-model';
import { cateogryNames } from '../sql/db-filler.category';

export async function fillCategoryTable() {
  return Promise.all(
    cateogryNames.map(async (name) => {
      return await DiscussionCategoryNoSql.create({
        name,
        description: `${name} description`,
        users: [],
      });
    })
  );
}
