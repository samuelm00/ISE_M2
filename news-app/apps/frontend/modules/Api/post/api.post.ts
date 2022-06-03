import { IDiscussionPostProps } from '@news-app/api-model';
import { baseFetch } from '../utils/api.utils';

export async function getPostsOfTopic(
  id: string
): Promise<IDiscussionPostProps> {
  return baseFetch<IDiscussionPostProps>(`/api/sql/posts/${id}`, undefined, {
    method: 'GET',
  });
}
