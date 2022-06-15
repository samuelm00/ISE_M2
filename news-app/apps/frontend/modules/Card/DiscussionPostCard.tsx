import { IDiscussionPostProps } from '@news-app/api-model';
import React, { Fragment, useCallback } from 'react';
import { avatarCardVariants } from './AvatarCard';
import { motion } from 'framer-motion';
import { getRepliesOfPost } from '../Api/post/api.post';
import { useFetch } from '../common/hooks/common.hooks';
import LoadingSpinner from '../Spinner/LoadingSpinner';
import DialogButton from '../Button/DialogButton';
import CreatePostDialog from '../Dialog/Post/CreatePostDialog';
import { useDbVariant } from 'apps/frontend/provider/Db/hook.db-provider';

interface DiscussionPostCardProps {
  topicId: number;
  post: IDiscussionPostProps;
}

export default function DiscussionPostCard({
  post,
  topicId,
}: DiscussionPostCardProps) {
  const [dbVariant] = useDbVariant();
  const getRepliesMemo = useCallback(
    () => getRepliesOfPost(dbVariant, topicId, post.id),
    [topicId, post.id]
  );
  const { data, isLoading, setData } = useFetch(getRepliesMemo);

  return (
    <Fragment>
      <motion.div
        variants={avatarCardVariants}
        className="card collapse collapse-plus shadow-2xl bg-neutral"
      >
        <input type="checkbox" className="peer" />
        <div className="collapse-title">
          <p>{post.text}</p>
        </div>
        <div className="collapse-content">
          {isLoading ? (
            <div className="flex justify-center">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="ml-5 space-y-3">
              {data?.map((reply) => (
                <div className="card bg-base-100">
                  <div className="card-body p-4">
                    <p>{reply.text}</p>
                  </div>
                </div>
              ))}
              <div>
                <DialogButton
                  className="btn-primary btn-sm"
                  id={`create-parent-post-${post.id}`}
                >
                  Reply
                </DialogButton>
              </div>
            </div>
          )}
        </div>
      </motion.div>
      <CreatePostDialog
        id={`create-parent-post-${post.id}`}
        topicId={topicId}
        setData={setData}
        parentId={post.id}
      />
    </Fragment>
  );
}
