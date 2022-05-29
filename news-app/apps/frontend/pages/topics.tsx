import React from 'react';
import { GetTopicResponse, getTopics } from '../modules/Api/topic/api.topic';
import { useFetch } from '../modules/common/hooks/common.hooks';

export default function TopicPage() {
  const { data, isLoading, error } = useFetch<GetTopicResponse>(getTopics);

  return <div></div>;
}
