import {
  IDiscussionPostProps,
  IDiscussionPostPropsCreate,
} from '@news-app/api-model';
import { baseFetch } from '../utils/api.utils';

/**
 *
 * @param id
 * @returns
 */
export async function getPostsOfTopic(
  id: string
): Promise<IDiscussionPostProps[]> {
  return baseFetch<IDiscussionPostProps[]>(`/api/sql/posts/${id}`, undefined, {
    method: 'GET',
  });
}

/**
 *
 * @param topicId
 * @param postId
 * @returns
 */
export async function getRepliesOfPost(
  topicId: number,
  postId: number
): Promise<IDiscussionPostProps[]> {
  return baseFetch<IDiscussionPostProps[]>(
    `/api/sql/posts/${topicId}/${postId}`,
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
export async function createPost(post: IDiscussionPostPropsCreate) {
  return baseFetch<IDiscussionPostProps>(`/api/sql/posts`, post, {
    method: 'POST',
  });
}
