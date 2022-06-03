import { BaseResponse, IDiscussionCategoryProps } from '@news-app/api-model';
import { baseFetch } from '../utils/api.utils';

export function getCategories() {
  return baseFetch<IDiscussionCategoryProps[]>(
    '/api/sql/categories',
    undefined,
    {
      method: 'GET',
    }
  );
}

export function getCategory(id: number) {
  return baseFetch<IDiscussionCategoryProps>(
    `/api/sql/categories/${id}`,
    undefined,
    {
      method: 'GET',
    }
  );
}
