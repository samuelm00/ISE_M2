import { DiscussionPost } from "@news-app/api-model";
import { topicsSql } from "./db-filler.topic";
import { faker } from "@faker-js/faker";
import { userSql } from "./db-filler.user";

const posts = []
const responsePosts = []
export let postsSql: DiscussionPost[];

export async function fillPostTable() {
    generateRandomPosts()
    const parentPostsSql = await DiscussionPost.bulkCreate(posts);
    generateResponsePosts(parentPostsSql);
    const responsePostsSql = await DiscussionPost.bulkCreate(responsePosts)
    return Promise.all(postsSql =  parentPostsSql.concat(responsePostsSql))
}

function generateRandomPosts() {
    topicsSql.forEach((topic) => {
        const numberOfPosts = Math.floor(Math.random()*3)
        for(let i = 0; i < numberOfPosts; i++) {
            const userId: number = userSql[Math.floor(Math.random()*userSql.length)].id;
            const post = {
                text: faker.lorem.sentence(),
                datetime: faker.date.between(topic.datetime,Date.now()),
                discussionThemeId: topic.id,
                userId: userId
            }
            posts.push(post);
        }
    });
}
function generateResponsePosts(parentPostsSql) {
    parentPostsSql.forEach( (post) => {
        if(Math.floor(Math.random()*100) > 50) {
            const numberOfPosts = Math.floor(Math.random()*2)+1;
            for(let i = 0; i < numberOfPosts; i++) {
                const userId: number = userSql[Math.floor(Math.random()*userSql.length)].id;
                const responsePost = {
                    text: faker.lorem.sentence(),
                    datetime: faker.date.between(post.datetime,Date.now()),
                    discussionThemeId: post.discussionThemeId,
                    userId: userId,
                    parentPostId: post.id,
                }
                responsePosts.push(responsePost);
            }
        }
    })
}

