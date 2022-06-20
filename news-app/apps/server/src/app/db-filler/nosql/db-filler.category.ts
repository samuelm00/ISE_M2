import { DiscussionCategory, DiscussionCategoryNoSql } from '@news-app/api-model';

export const categoriesIdMap = new Map();

export async function fillCategoryTable() {
  const categories = await DiscussionCategory.findAll();
    return Promise.all(categories.map(async (category) => {
      const categoryNoSql =  await DiscussionCategoryNoSql.create({
        name:category.name,
        description: category.description,
        users: [],
      });
      categoriesIdMap.set(category.id, categoryNoSql._id);
      return category;
    }));
}
