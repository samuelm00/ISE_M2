import { getPostsOfTopic } from 'apps/frontend/modules/Api/post/api.post';
import DialogButton from 'apps/frontend/modules/Button/DialogButton';
import { useFetch } from 'apps/frontend/modules/common/hooks/common.hooks';
import CreatePostDialog, {
  createPostDialogId,
} from 'apps/frontend/modules/Dialog/Post/CreatePostDialog';
import PageHeader from 'apps/frontend/modules/Page/header/PageHeader';
import LoadingSpinner from 'apps/frontend/modules/Spinner/LoadingSpinner';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import React, { useCallback, useMemo } from 'react';
import { avatarCardVariants } from 'apps/frontend/modules/Card/AvatarCard';
import DiscussionPostCard from 'apps/frontend/modules/Card/DiscussionPostCard';
import { getTopic } from 'apps/frontend/modules/Api/topic/api.topic';

export default function TopicDetailPage() {
  const router = useRouter();
  const topicId = useMemo(() => router.query.slug as string, [router.query]);
  const getPostsMemo = useCallback(
    () => getPostsOfTopic(topicId),
    [router.query]
  );
  const getTopicMemo = useCallback(() => getTopic(topicId), [topicId]);
  const { data: topic } = useFetch(getTopicMemo);
  const { data, isLoading, setData } = useFetch(getPostsMemo);

  if (isLoading || !data || !topic) {
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
          <PageHeader title={`Discussion Posts for Topic: ${topic.title}`} />
          <DialogButton id={createPostDialogId} className="btn-primary">
            Create Post
          </DialogButton>
        </div>
        <motion.div
          variants={avatarCardVariants}
          transition={{ staggerChildren: 0.2, delayChildren: 0.2 }}
          initial="initial"
          animate="animate"
          className="space-y-5"
        >
          {data?.map((post) => (
            <DiscussionPostCard
              topicId={Number(topicId)}
              post={post}
              key={post.id}
            />
          ))}
        </motion.div>
      </div>
      <CreatePostDialog topicId={Number(topicId)} setData={setData} />
    </>
  );
}
