import { DiscussionTopic } from '../discussion-topic/model.discussion-topic';

export interface CreateDiscussionPayload extends Omit<DiscussionTopic, 'user'> {
  userId: number;
}
