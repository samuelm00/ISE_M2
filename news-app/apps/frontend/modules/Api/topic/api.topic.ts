import {
  CreateDiscussionPayload,
  IDiscussionTopicProps,
  IDiscussionTopicPropsWithCategory,
  PaginatedPayload,
  PaginatedResponse,
} from '@news-app/api-model';
import { defaultPageSize } from '../constants/api.constants.endpoint';
import { baseFetch } from '../utils/api.utils';

export type GetTopicResponse =
  PaginatedResponse<IDiscussionTopicPropsWithCategory>;

/**
 *
 * @param sql
 * @returns
 */
export function getTopics(sql?: boolean) {
  const body: PaginatedPayload = {
    page: 0,
    pageSize: defaultPageSize,
  };
  return baseFetch<GetTopicResponse>(
    `/api/${sql ? 'sql' : 'nosql'}/topic`,
    undefined,
    {
      method: 'GET',
    }
  );
}

/**
 *
 * @param id
 * @returns
 */
export async function getTopic(id: string) {
  return baseFetch<IDiscussionTopicPropsWithCategory>(
    `/api/sql/topic/${id}`,
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
export function createTopic(topic: CreateDiscussionPayload) {
  return baseFetch<IDiscussionTopicProps>('/api/sql/topic', topic, {
    method: 'POST',
  });
}
