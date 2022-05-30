import {
  IDiscussionTopicProps,
  IDiscussionTopicPropsWithCategory,
} from '@news-app/api-model';
import React from 'react';
import { motion } from 'framer-motion';
import { avatarCardVariants } from './AvatarCard';

interface DiscussionTopicCardProps {
  topic: IDiscussionTopicPropsWithCategory;
}

export default function DiscussionTopicCard({
  topic: { title, text, category },
}: DiscussionTopicCardProps) {
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
        <h3 className="font-bold">{category.name}</h3>
        <p>{getText()}</p>
      </div>
    </motion.div>
  );
}
