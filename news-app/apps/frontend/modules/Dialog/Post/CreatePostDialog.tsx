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
  parentId?: number;
  id?: string;
  setData: React.Dispatch<React.SetStateAction<IDiscussionPostProps[]>>;
}

function getDefaultInputs(
  userId: number,
  topicId: number,
  parentId?: number
): IDiscussionPostPropsCreate {
  return {
    text: '',
    datetime: new Date(),
    discussionThemeId: topicId,
    userId,
    parentPostId: parentId,
  };
}

export default function CreatePostDialog({
  topicId,
  setData,
  parentId,
  id,
}: CreatePostDialogProps) {
  const [user] = useAuthProvider();
  const [inputs, setInputs] = useState(
    getDefaultInputs(user.id, topicId, parentId)
  );

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
    closeDialog(id || createPostDialogId);
  };

  return (
    <BaseDialog id={id || createPostDialogId}>
      <div className="space-y-8">
        <h2 className="text-2xl">
          {parentId ? 'Reply to post' : 'Create a new Post'}
        </h2>

        <CreatePostForm
          inputs={inputs}
          setInputs={setInputs}
          onSubmit={createNewPost}
          submitButton={
            <div className="w-full flex justify-end">
              <Button className="btn-primary" type="submit">
                {parentId ? 'Reply' : 'Create Post'}
              </Button>
            </div>
          }
        />
      </div>
    </BaseDialog>
  );
}
