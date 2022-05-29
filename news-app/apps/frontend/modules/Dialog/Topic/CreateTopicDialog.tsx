import { useAuthProvider } from 'apps/frontend/provider/Auth/hook.auth';
import React from 'react';
import { createTopic } from '../../Api/topic/api.topic';
import Button from '../../Button/Button';
import BaseDialog from '../BaseDialog';
import { closeDialog } from '../utils/dialog.utils';

export const createTopicDialogId = 'create-topic-dialog';

export default function CreateTopicDialog() {
  const [user] = useAuthProvider();

  const createNewTopic = async () => {
    await createTopic({
      title: 'New Topic',
      datetime: new Date(),
      discussionCategoryId: 1,
      text: 'New Topic',
      userId: user.id,
    });
    closeDialog();
  };

  return (
    <BaseDialog id={createTopicDialogId}>
      <h2>Create a new Topic</h2>
      <div className="w-full flex justify-end">
        <Button className="btn-primary" onClick={createNewTopic}>
          Create Topic
        </Button>
      </div>
    </BaseDialog>
  );
}
