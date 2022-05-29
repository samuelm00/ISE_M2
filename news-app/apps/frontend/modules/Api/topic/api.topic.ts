import {
  BaseResponse,
  CreateDiscussionPayload,
  IDiscussionTopicProps,
  PaginatedPayload,
} from '@news-app/api-model';
import { defaultPageSize } from '../constants/api.constants.endpoint';
import { baseFetch } from '../utils/api.utils';

export type GetTopicResponse = BaseResponse<IDiscussionTopicProps[]> & {
  pagination: PaginatedPayload;
};

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
    body,
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
  return baseFetch<BaseResponse<IDiscussionTopicProps>>(
    '/api/sql/topic',
    topic,
    {
      method: 'POST',
    }
  );
}
