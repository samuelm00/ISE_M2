import {
  IDiscussionPostProps,
  IDiscussionPostPropsCreate,
} from '@news-app/api-model';
import { DbVariant } from 'apps/frontend/provider/Db/DbProvider';
import { baseFetch } from '../utils/api.utils';

/**
 *
 * @param id
 * @returns
 */
export async function getPostsOfTopic(
  dbVariant: DbVariant,
  id: string
): Promise<IDiscussionPostProps[]> {
  return baseFetch<IDiscussionPostProps[]>(
    `/api/${dbVariant}/posts/${id}`,
    undefined,
    {
      method: 'GET',
    }
  );
}

/**
 *
 * @param topicId
 * @param postId
 * @returns
 */
export async function getRepliesOfPost(
  dbVariant: DbVariant,
  topicId: number | string,
  postId: number | string
): Promise<IDiscussionPostProps[]> {
  return baseFetch<IDiscussionPostProps[]>(
    `/api/${dbVariant}/posts/${topicId}/${postId}`,
    undefined,
    {
      method: 'GET',
    }
  );
}

/**
 *
 * @param post
 * @returns
 */
export async function createPost(
  dbVariant: DbVariant,
  post: IDiscussionPostPropsCreate
) {
  return baseFetch<IDiscussionPostProps>(`/api/${dbVariant}/posts`, post, {
    method: 'POST',
  });
}
