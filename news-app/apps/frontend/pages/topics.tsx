import React, { useCallback, useState } from 'react';
import {
  getTopics,
  getTopicsSortedByPost,
} from '../modules/Api/topic/api.topic';
import DialogButton from '../modules/Button/DialogButton';
import DiscussionTopicCard from '../modules/Card/DiscussionTopicCard';
import { useFetch } from '../modules/common/hooks/common.hooks';
import CreateTopicDialog, {
  createTopicDialogId,
} from '../modules/Dialog/Topic/CreateTopicDialog';
import PageHeader from '../modules/Page/header/PageHeader';
import LoadingSpinner from '../modules/Spinner/LoadingSpinner';
import { motion } from 'framer-motion';
import { avatarCardVariants } from '../modules/Card/AvatarCard';
import { useDbVariant } from '../provider/Db/hook.db-provider';

export default function TopicPage() {
  const [dbVariant] = useDbVariant();
  const [sortByMostPosts, setSortByMostPosts] = useState(false);
  const getTopicMemo = useCallback(() => getTopics(dbVariant), [dbVariant]);
  const getTopicReport = useCallback(
    () => getTopicsSortedByPost(dbVariant),
    [dbVariant]
  );
  const { data, isLoading, setData } = useFetch(getTopicMemo);
  const { data: dataByPosts } = useFetch(getTopicReport);

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
          <PageHeader title="Discussion Topics" />
          <DialogButton id={createTopicDialogId} className="btn-primary">
            Create Topic
          </DialogButton>
        </div>
        <div className="w-full flex justify-center">
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Show most popular Topics</span>
              <input
                type="checkbox"
                checked={sortByMostPosts}
                onChange={() => setSortByMostPosts((prev) => !prev)}
                className="checkbox"
              />
            </label>
          </div>
        </div>
        <motion.div
          variants={avatarCardVariants}
          transition={{ staggerChildren: 0.2, delayChildren: 0.2 }}
          initial="initial"
          animate="animate"
          className="grid grid-cols-3 gap-4"
        >
          {sortByMostPosts
            ? dataByPosts.data?.map((topic) => (
                <DiscussionTopicCard topic={topic} key={topic.id} />
              ))
            : data.data?.map((topic) => (
                <DiscussionTopicCard topic={topic} key={topic.id} />
              ))}
        </motion.div>
      </div>
      <CreateTopicDialog setData={setData} />
    </>
  );
}
