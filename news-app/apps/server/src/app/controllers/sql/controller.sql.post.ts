import { IDiscussionPostProps } from "@news-app/api-model";

export async function createPost (req,res) {
    //conversion
    const post = req.body;
    // add post to db

    res.status(200);
}

export async function getPostsOfTheme (req,res) {
    const themeId:number = req.params.id;
    // get all posts of id
    const posts: IDiscussionPostProps[] = [];
    res.json(posts);
}