import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { getTopicsGroupedByCategory } from '../modules/Api/topic/api.topic';
import Button from '../modules/Button/Button';
import { avatarCardVariants } from '../modules/Card/AvatarCard';
import DiscussionTopicCard from '../modules/Card/DiscussionTopicCard';
import { useFetch } from '../modules/common/hooks/common.hooks';
import { RoutePath } from '../modules/Navigation/common/constants/constant.route';
import LoadingSpinner from '../modules/Spinner/LoadingSpinner';
import { useAuthProvider } from '../provider/Auth/hook.auth';
import { useDbVariant } from '../provider/Db/hook.db-provider';

export default function ProfilePage() {
  const [dbVariant, setDbVariant] = useDbVariant();
  const router = useRouter();
  const [user, setUser] = useAuthProvider();
  const getTopicMemo = useCallback(
    () => getTopicsGroupedByCategory(dbVariant, user.id),
    [dbVariant, user.id]
  );
  const { data, isLoading } = useFetch(getTopicMemo);

  if (isLoading || !data) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <Button
        className="btn-primary"
        onClick={() => {
          setDbVariant((prev) => (prev === 'sql' ? 'nosql' : 'sql'));
          setUser(undefined);
          router.push(RoutePath.Login);
        }}
      >
        SwitchDB
      </Button>
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
  );
}
