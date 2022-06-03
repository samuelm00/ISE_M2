import React, { useCallback } from 'react';
import { GetTopicResponse, getTopics } from '../modules/Api/topic/api.topic';
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

export default function TopicPage() {
  const getTopicMemo = useCallback(() => getTopics(true), []);
  const { data, isLoading, setData } = useFetch(getTopicMemo);

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
            Creat Topic
          </DialogButton>
        </div>
        <motion.div
          variants={avatarCardVariants}
          transition={{ staggerChildren: 0.2, delayChildren: 0.2 }}
          initial="initial"
          animate="animate"
          className="grid grid-cols-3 gap-4"
        >
          {data.data?.map((topic) => (
            <DiscussionTopicCard topic={topic} key={topic.id} />
          ))}
        </motion.div>
      </div>
      <CreateTopicDialog setData={setData} />
    </>
  );
}
