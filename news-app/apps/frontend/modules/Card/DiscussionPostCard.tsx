import { IDiscussionPostProps } from '@news-app/api-model';
import React, { useCallback } from 'react';
import { avatarCardVariants } from './AvatarCard';
import { motion } from 'framer-motion';
import { getRepliesOfPost } from '../Api/post/api.post';
import { useFetch } from '../common/hooks/common.hooks';
import LoadingSpinner from '../Spinner/LoadingSpinner';
import DialogButton from '../Button/DialogButton';

interface DiscussionPostCardProps {
  topicId: number;
  post: IDiscussionPostProps;
}

export default function DiscussionPostCard({
  post,
  topicId,
}: DiscussionPostCardProps) {
  const getRepliesMemo = useCallback(
    () => getRepliesOfPost(topicId, post.id),
    [topicId, post.id]
  );
  const { data, isLoading } = useFetch(getRepliesMemo);

  return (
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
          <div className="space-y-3">
            {data?.map((reply) => (
              <div className="card bg-base-100">
                <p>{reply.text}</p>
              </div>
            ))}
            <div>
              <DialogButton className="btn-primary btn-sm" id="">
                Reply
              </DialogButton>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
