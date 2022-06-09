import {
  CreateDiscussionPayload,
  IDiscussionTopicProps,
  IDiscussionTopicPropsWithCategory,
  PaginatedPayload,
  PaginatedResponse,
} from '@news-app/api-model';
import { DbVariant } from 'apps/frontend/provider/Db/DbProvider';
import { defaultPageSize } from '../constants/api.constants.endpoint';
import { baseFetch } from '../utils/api.utils';

export type GetTopicResponse =
  PaginatedResponse<IDiscussionTopicPropsWithCategory>;

/**
 *
 * @param sql
 * @returns
 */
export function getTopics(dbVariant: DbVariant) {
  return baseFetch<GetTopicResponse>(`/api/${dbVariant}/topic`, undefined, {
    method: 'GET',
  });
}

/**
 *
 * @param id
 * @returns
 */
export async function getTopic(dbVariant: DbVariant, id: string) {
  return baseFetch<IDiscussionTopicPropsWithCategory>(
    `/api/${dbVariant}/topic/${id}`,
    undefined,
    {
      method: 'GET',
    }
  );
}

/**
 *
 * @param topic
 * @returns
 */
export function createTopic(
  dbVariant: DbVariant,
  topic: CreateDiscussionPayload
) {
  return baseFetch<IDiscussionTopicProps>(`/api/${dbVariant}/topic`, topic, {
    method: 'POST',
  });
}
