import {
  IDiscussionPostProps,
  IDiscussionPostPropsCreate,
} from '@news-app/api-model';
import { useAuthProvider } from 'apps/frontend/provider/Auth/hook.auth';
import React, { useState } from 'react';
import { createPost } from '../../Api/post/api.post';
import Button from '../../Button/Button';
import CreatePostForm from '../../Form/CreatePostFrom';
import BaseDialog from '../BaseDialog';
import { closeDialog } from '../utils/dialog.utils';

export const createPostDialogId = 'create-post-dialog';

interface CreatePostDialogProps {
  topicId: number;
  setData: React.Dispatch<React.SetStateAction<IDiscussionPostProps[]>>;
}

function getDefaultInputs(
  userId: number,
  topicId: number
): IDiscussionPostPropsCreate {
  return {
    text: '',
    datetime: new Date(),
    discussionThemeId: topicId,
    userId,
  };
}

export default function CreatePostDialog({
  topicId,
  setData,
}: CreatePostDialogProps) {
  const [user] = useAuthProvider();
  const [inputs, setInputs] = useState(getDefaultInputs(user.id, topicId));

  const createNewPost = async () => {
    if (!inputs.text.length) {
      alert('Text is required');
      return;
    }

    const post = await createPost(inputs);

    if (!post) {
      alert('Error creating post');
      return;
    }

    setData((prevState) => [...prevState, post]);
    closeDialog();
  };

  return (
    <BaseDialog id={createPostDialogId}>
      <div className="space-y-8">
        <h2 className="text-2xl">Create a new Post</h2>

        <CreatePostForm
          inputs={inputs}
          setInputs={setInputs}
          onSubmit={createNewPost}
          submitButton={
            <div className="w-full flex justify-end">
              <Button className="btn-primary" type="submit">
                Create Post
              </Button>
            </div>
          }
        />
      </div>
    </BaseDialog>
  );
}
