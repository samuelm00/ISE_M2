import { IDiscussionCategoryProps } from '@news-app/api-model';
import { DbVariant } from 'apps/frontend/provider/Db/DbProvider';
import { baseFetch } from '../utils/api.utils';

export function getCategories(dbVariant: DbVariant) {
  return baseFetch<IDiscussionCategoryProps[]>(
    `/api/${dbVariant}/categories`,
    undefined,
    {
      method: 'GET',
    }
  );
}

export function getCategory(dbVariant: DbVariant, id: number | string) {
  return baseFetch<IDiscussionCategoryProps>(
    `/api/${dbVariant}/categories/${id}`,
    undefined,
    {
      method: 'GET',
    }
  );
}
