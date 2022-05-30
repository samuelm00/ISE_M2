import { IDiscussionTopicProps } from '@news-app/api-model';
import React from 'react';
import { motion } from 'framer-motion';
import { avatarCardVariants } from './AvatarCard';

interface DiscussionTopicCardProps {
  topic: IDiscussionTopicProps;
}

export default function DiscussionTopicCard({
  topic: { title, text, discussionCategoryId },
}: DiscussionTopicCardProps) {
  return (
    <motion.div
      variants={avatarCardVariants}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="card card-side glass shadow-2xl"
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
        <p>{text}</p>
      </div>
    </motion.div>
  );
}
