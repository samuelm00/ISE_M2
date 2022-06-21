import { DiscussionPost, DiscussionPostNoSql, DiscussionTopicNoSql, UserVote } from "@news-app/api-model";
import { Op } from "sequelize";
import { topicsIdMap } from "./db-filler.topic";
import { usersIdMap } from "./db-filler.user";

const postsIdMap = new Map();

export async function fillPostTable() {
    const parentPostsSql: any = await DiscussionPost.findAll({ where: { parentPostId: null }, include: UserVote })
    await migratePosts(parentPostsSql)
    const responsePostsSql: any = await DiscussionPost.findAll({ where: { parentPostId: { [Op.ne]: null } }, include: UserVote })
    return await migratePosts(responsePostsSql);
}

async function migratePosts(sqlposts) {
    return Promise.all(sqlposts.map(async (post) => {
        const nosqlPost = {
            text: post.text,
            datetime: post.datetime,
            parentPostId: ((post.parentPostId !== null) ? postsIdMap.get(post.parentPostId) : null),
            discussionThemeId: topicsIdMap.get(post.discussionThemeId),
            userId: usersIdMap.get(post.userId),
            userVotes: post.UserVotes.map((userVote) => ({
                datetime: userVote.datetime,
                isUpvote: userVote.isUpvote,
                userId: usersIdMap.get(userVote.userId)
            }))
        }
        const postNoSql = await DiscussionPostNoSql.create(nosqlPost);
        postsIdMap.set(post.id, postNoSql._id);
        await DiscussionTopicNoSql.findOneAndUpdate({ _id: topicsIdMap.get(post.discussionThemeId) }, { $inc: { 'postsCount': 1 } })
    }));
}