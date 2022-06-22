import { postsSql } from "./db-filler.post";
import { userSql } from "./db-filler.user";
import { faker } from "@faker-js/faker";
import { UserVote } from "@news-app/api-model";

const votes = []

export async function fillVoteTable() {
    generateUserVotes();
    return await UserVote.bulkCreate(votes);
}

function generateUserVotes() {
    userSql.forEach((user) => {
        postsSql.forEach((post) => {
            const randomNumber = Math.floor(Math.random() * 100);

            if (randomNumber > 35) {
                const vote = {
                    datetime: faker.date.between(post.datetime, Date.now()),
                    isUpvote: randomNumber > 67,
                    discussionPostId: post.id,
                    userId: user.id
                }
                votes.push(vote);
            }
        })
    })
}
