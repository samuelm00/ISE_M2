import { DiscussionTopic, DiscussionTopicNoSql } from "@news-app/api-model";
import { categoriesIdMap } from "./db-filler.category";
import { usersIdMap } from "./db-filler.user";

export const topicsIdMap = new Map();

export async function fillTopicTable() {
    const topicsSql = await DiscussionTopic.findAll();
    return Promise.all(topicsSql.map(async (topic) => {
        const topicNoSql = await DiscussionTopicNoSql.create({
            text: topic.text,
            title: topic.title,
            datetime: topic.datetime,
            userId: usersIdMap.get(topic.userId),
            discussionCategory: categoriesIdMap.get(topic.discussionCategoryId),
        });
        topicsIdMap.set(topic.id, topicNoSql._id);
        return topic;
    }));
}