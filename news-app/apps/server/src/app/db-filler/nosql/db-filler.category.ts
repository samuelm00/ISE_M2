import { DiscussionCategory, DiscussionCategoryNoSql } from '@news-app/api-model';

export async function fillCategoryTable() {
  const categories = await DiscussionCategory.findAll();
  return Promise.all(
    categories.map(async (category) => {
      return await DiscussionCategoryNoSql.create({
        name:category.name,
        description: category.description,
        users: [],
      });
    })
  );
}
