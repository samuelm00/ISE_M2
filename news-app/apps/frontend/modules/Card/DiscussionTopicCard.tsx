import { IDiscussionTopicProps } from '@news-app/api-model';
import React from 'react';

interface DiscussionTopicCardProps {
  topic: IDiscussionTopicProps;
}

export default function DiscussionTopicCard({
  topic: { title, discussionCategoryId },
}: DiscussionTopicCardProps) {
  return (
    <div className="card glass shadow-2xl">
      <img src="" alt="" />
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
      </div>
    </div>
  );
}
