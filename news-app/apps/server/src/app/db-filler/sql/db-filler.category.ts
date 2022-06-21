import { DiscussionCategory, IDiscussionCategoryProps } from '@news-app/api-model';

const categoryNames = [
  'Local News',
  'World News',
  'Business',
  'Technology',
  'Entertainment',
  'Sports',
  'Science',
  'Health',
  'Politics',
  'Education',
  'Arts',
];

const categories: Omit<IDiscussionCategoryProps, 'id'>[] = []

export let categoriesSql: DiscussionCategory[];

export async function fillCategoryTable() {
  createCategories();
  return Promise.all(categoriesSql = await DiscussionCategory.bulkCreate(categories));
}

function createCategories() {
  categoryNames.forEach((name) => {
    const category = {
      name: name,
      description: `${name} description`
    }
    categories.push(category);
  })
}
