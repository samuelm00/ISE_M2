import { getPostsOfTopic } from 'apps/frontend/modules/Api/post/api.post';
import DialogButton from 'apps/frontend/modules/Button/DialogButton';
import { useFetch } from 'apps/frontend/modules/common/hooks/common.hooks';
import { createTopicDialogId } from 'apps/frontend/modules/Dialog/Topic/CreateTopicDialog';
import PageHeader from 'apps/frontend/modules/Page/header/PageHeader';
import LoadingSpinner from 'apps/frontend/modules/Spinner/LoadingSpinner';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

export default function TopicDetailPage() {
  const router = useRouter();
  const getPostsMemo = useCallback(
    () => getPostsOfTopic(router.query.slug as string),
    [router.query]
  );
  const { data, isLoading, setData } = useFetch(getPostsMemo);

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
        <div className="flex justify-between items-center">
          <PageHeader title="Discussion Posts" />
          <DialogButton id={createTopicDialogId} className="btn-primary">
            Create Post
          </DialogButton>
        </div>
      </div>
    </>
  );
}
