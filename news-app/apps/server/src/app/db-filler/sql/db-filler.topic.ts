import { DiscussionTopic, IDiscussionTopicComplete } from "@news-app/api-model";
import { categoriesSql } from "./db-filler.category";
import { userSql } from "./db-filler.user";
import { faker } from "@faker-js/faker";

const topics = []
export let topicsSql: DiscussionTopic[];

export async function fillTopicTable() {
    generateRandomTopics()
    return Promise.all(topicsSql = await DiscussionTopic.bulkCreate(topics));
}

function generateRandomTopics() {
    userSql.forEach((user) => {
        const numberOfTopics = Math.floor(Math.random()*7)
        for (let i = 0; i < numberOfTopics; i++) {
            const categoryId: number = categoriesSql[Math.floor(Math.random()*categoriesSql.length)].id;
            const userId : number = user.id
            const topic: Omit<IDiscussionTopicComplete,'id'> = {
                text: faker.lorem.lines(),
                title:"topic " + faker.random.numeric(2),
                datetime: faker.date.between("2020-02-01", Date.now()),
                userId: userId,
                discussionCategoryId: categoryId
            }
            topics.push(topic);
        }
    });

}