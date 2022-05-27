import { DiscussionPost, IDiscussionPostProps } from "@news-app/api-model";
import { responseJson } from "../../util/util.response";

export async function createPost (req,res) {
    try {
        const post = await DiscussionPost.create({
            datetime: req.body.datetime,
            text: req.body.text,
            userId: req.body.userId,
            discussionThemeId: req.body.discussionThemeId,
            parentPostId: req.body.parentPostId,
        });
        return res.status(200).json(responseJson({ payload: post }));
    } catch (error) {
      return res.status(400).json(responseJson({ error: error.message }));
    }
}

export async function getPostsOfTheme (req,res) {
    try {
        const posts : DiscussionPost[] = await DiscussionPost.findAll({
            where: 
                {discussionThemeId: req.params.id},
        });

        const response : IDiscussionPostProps[] = posts.map((post) => ({
            id: post.id,
            text: post.text,
            datetime: post.datetime,
        })); 

        return res.status(200).json(responseJson({ payload: response }));
    } catch (error) {
        return res.status(400).json(responseJson({ error: error.message }));
    }
}