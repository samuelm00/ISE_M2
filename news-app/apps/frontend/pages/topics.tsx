import React from 'react';
import { GetTopicResponse, getTopics } from '../modules/Api/topic/api.topic';
import Button from '../modules/Button/Button';
import { useFetch } from '../modules/common/hooks/common.hooks';
import PageHeader from '../modules/Page/header/PageHeader';

export default function TopicPage() {
  const { data, isLoading, error } = useFetch<GetTopicResponse>(getTopics);

  return (
    <div>
      <div className="flex justify-between">
        <PageHeader title="Discussion Topics" />
        <Button>Create New Topic</Button>
      </div>
    </div>
  );
}
