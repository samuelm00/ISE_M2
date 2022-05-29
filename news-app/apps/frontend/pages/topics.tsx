import React, { useCallback } from 'react';
import { GetTopicResponse, getTopics } from '../modules/Api/topic/api.topic';
import DialogButton from '../modules/Button/DialogButton';
import { useFetch } from '../modules/common/hooks/common.hooks';
import CreateTopicDialog, {
  createTopicDialogId,
} from '../modules/Dialog/Topic/CreateTopicDialog';
import PageHeader from '../modules/Page/header/PageHeader';

export default function TopicPage() {
  const getTopicMemo = useCallback(() => getTopics(true), []);
  const { data, isLoading, error } = useFetch<GetTopicResponse>(getTopicMemo);
  console.log(data);

  return (
    <>
      <div>
        <div className="flex justify-between">
          <PageHeader title="Discussion Topics" />
          <DialogButton id={createTopicDialogId} className="btn-primary">
            Creat Topic
          </DialogButton>
        </div>
      </div>
      <CreateTopicDialog />
    </>
  );
}
