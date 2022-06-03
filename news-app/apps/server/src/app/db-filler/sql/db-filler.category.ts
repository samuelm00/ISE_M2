import { DiscussionCategory } from '@news-app/api-model';

const cateogryNames = [
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

export async function fillCategoryTable() {
  return Promise.all(
    cateogryNames.map(async (name) => {
      return await DiscussionCategory.create({
        name,
        description: `${name} description`,
      });
    })
  );
}
