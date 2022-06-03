import {
  DiscussionTopic,
  IDiscussionTopicProps,
} from '../discussion-topic/model.discussion-topic';

export interface CreateDiscussionPayload
  extends Omit<IDiscussionTopicProps, 'id'> {
  userId: number;
}
