import { IDiscussionTopicProps } from '@news-app/api-model';
import { useAuthProvider } from 'apps/frontend/provider/Auth/hook.auth';
import React from 'react';
import { createTopic } from '../../Api/topic/api.topic';
import Button from '../../Button/Button';
import CreateTopicForm from '../../Form/CreateTopicForm';
import BaseDialog from '../BaseDialog';
import { closeDialog } from '../utils/dialog.utils';

export const createTopicDialogId = 'create-topic-dialog';

function getDefaultInputs(userId: number): Omit<IDiscussionTopicProps, 'id'> {
  return {
    title: '',
    datetime: new Date(),
    discussionCategoryId: -1,
    text: '',
    userId,
  };
}

export default function CreateTopicDialog() {
  const [user] = useAuthProvider();
  const [inputs, setInputs] = React.useState<Omit<IDiscussionTopicProps, 'id'>>(
    getDefaultInputs(user.id)
  );

  const createNewTopic = async () => {
    await createTopic({
      title: inputs.title,
      datetime: new Date(),
      discussionCategoryId: inputs.discussionCategoryId,
      text: inputs.text,
      userId: user.id,
    });
    setInputs(getDefaultInputs(user.id));
    closeDialog();
  };

  return (
    <BaseDialog id={createTopicDialogId}>
      <div className="space-y-8">
        <h2 className="text-2xl">Create a new Topic</h2>

        <CreateTopicForm
          inputs={inputs}
          setInputs={setInputs}
          onSubmit={createNewTopic}
          submitButton={
            <div className="w-full flex justify-end">
              <Button className="btn-primary" type="submit">
                Create Topic
              </Button>
            </div>
          }
        />
      </div>
    </BaseDialog>
  );
}
