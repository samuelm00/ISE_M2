import {
  BaseResponse,
  IDiscussionTopicProps,
  PaginatedPayload,
} from '@news-app/api-model';
import { defaultPageSize } from '../constants/api.constants.endpoint';
import { baseFetch } from './api.utils';

/**
 *
 * @param endpoint
 * @returns
 */
export function getTopics(sql?: boolean) {
  const body: PaginatedPayload = {
    page: 0,
    pageSize: defaultPageSize,
  };
  return baseFetch<
    BaseResponse<IDiscussionTopicProps[]> & { pagination: PaginatedPayload }
  >(`/api/${sql ? 'sql' : 'nosql'}/topic`, body, {
    method: 'GET',
  });
}
