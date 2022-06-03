import { IDiscussionPostProps } from '@news-app/api-model';
import React from 'react';
import { avatarCardVariants } from './AvatarCard';
import { motion } from 'framer-motion';

interface DiscussionPostCardProps {
  post: IDiscussionPostProps;
}

export default function DiscussionPostCard({ post }: DiscussionPostCardProps) {
  return (
    <motion.div
      variants={avatarCardVariants}
      className="card card-side glass shadow-2xl"
    >
      <div className="card-body">
        <p>{post.text}</p>
      </div>
    </motion.div>
  );
}
