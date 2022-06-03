import {
  IDiscussionTopicProps,
  IDiscussionTopicPropsWithCategory,
} from '@news-app/api-model';
import React from 'react';
import { motion } from 'framer-motion';
import { avatarCardVariants } from './AvatarCard';
import { useRouter } from 'next/router';
import { getRelativeRoute } from '../Navigation/common/utils/util.route';
import { RoutePath } from '../Navigation/common/constants/constant.route';

interface DiscussionTopicCardProps {
  topic: IDiscussionTopicPropsWithCategory;
}

export default function DiscussionTopicCard({
  topic: { title, text, category, id },
}: DiscussionTopicCardProps) {
  const router = useRouter();

  const getText = () => {
    if (text.length > 50) {
      return text.substring(0, 50) + '...';
    }
    return text;
  };

  return (
    <motion.div
      variants={avatarCardVariants}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => router.push(getRelativeRoute(RoutePath.Posts, id + ''))}
      className="card card-side glass shadow-2xl cursor-pointer"
    >
      <div className="flex justify-center items-center text-white">
        <img
          className="w-10 h-10"
          src="/assets/info-icon.svg"
          alt="Info Icon"
        />
      </div>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <div className="badge">{category.name}</div>
        <p>{getText()}</p>
      </div>
    </motion.div>
  );
}
