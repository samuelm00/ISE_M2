import React, { useCallback } from 'react';
import { GetTopicResponse, getTopics } from '../modules/Api/topic/api.topic';
import DialogButton from '../modules/Button/DialogButton';
import DiscussionTopicCard from '../modules/Card/DiscussionTopicCard';
import { useFetch } from '../modules/common/hooks/common.hooks';
import CreateTopicDialog, {
  createTopicDialogId,
} from '../modules/Dialog/Topic/CreateTopicDialog';
import PageHeader from '../modules/Page/header/PageHeader';
import LoadingSpinner from '../modules/Spinner/LoadingSpinner';

export default function TopicPage() {
  const getTopicMemo = useCallback(() => getTopics(true), []);
  const { data, isLoading } = useFetch(getTopicMemo);
  console.log(data);

  if (isLoading || !data) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-10">
        <div className="flex justify-between">
          <PageHeader title="Discussion Topics" />
          <DialogButton id={createTopicDialogId} className="btn-primary">
            Creat Topic
          </DialogButton>
        </div>
        <div className="space-y-6">
          {data.data?.map((topic) => (
            <DiscussionTopicCard topic={topic} key={topic.id} />
          ))}
        </div>
      </div>
      <CreateTopicDialog />
    </>
  );
}
