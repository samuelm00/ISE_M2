import { IDiscussionTopicProps } from '@news-app/api-model';
import { useAuthProvider } from 'apps/frontend/provider/Auth/hook.auth';
import React from 'react';
import { createTopic, GetTopicResponse } from '../../Api/topic/api.topic';
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

interface CreateTopicDialogProps {
  setData: React.Dispatch<React.SetStateAction<GetTopicResponse>>;
}

export default function CreateTopicDialog({ setData }: CreateTopicDialogProps) {
  const [user] = useAuthProvider();
  const [inputs, setInputs] = React.useState<Omit<IDiscussionTopicProps, 'id'>>(
    getDefaultInputs(user.id)
  );

  const createNewTopic = async () => {
    if (inputs.discussionCategoryId === -1) {
      alert('Please select a category');
      return;
    }

    const topic = await createTopic({
      title: inputs.title,
      datetime: new Date(),
      discussionCategoryId: inputs.discussionCategoryId,
      text: inputs.text,
      userId: user.id,
    });

    if (!topic) {
      alert('Error creating topic');
      return;
    }

    setData((prev) => ({
      ...prev,
      data: prev.data ? [...prev.data, topic] : [topic],
    }));

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
