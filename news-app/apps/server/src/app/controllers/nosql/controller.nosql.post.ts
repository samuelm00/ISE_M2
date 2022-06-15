import {
  DiscussionPost,
  IDiscussionPostProps,
  DiscussionPostNoSql,
} from '@news-app/api-model';
import { responseJson } from '../../util/util.response';

export async function createPost(req, res) {
  try {
    const post = await DiscussionPostNoSql.create({
      datetime: req.body.datetime,
      text: req.body.text,
      userId: req.body.userId,
      discussionThemeId: req.body.discussionThemeId,
      parentPostId: req.body.parentPostId,
      userVotes: [],
    });
    const response: IDiscussionPostProps = {
      datetime: post.datetime,
      id: post._id.toString(),
      text: post.text,
    };
    return res.status(200).json(responseJson({ payload: response }));
  } catch (error) {
    return res.status(400).json(responseJson({ error: error.message }));
  }
}

export async function getPostsOfTheme(req, res) {
  try {
    const posts = await DiscussionPostNoSql.find({
      $and: [{ discussionThemeId: req.params.id }, { parentPostId: null }],
    });

    const response: IDiscussionPostProps[] = posts.map((post) => ({
      id: post._id.toString(),
      text: post.text,
      datetime: post.datetime,
    }));

    return res.status(200).json(responseJson({ payload: response }));
  } catch (error) {
    return res.status(400).json(responseJson({ error: error.message }));
  }
}

export async function getRepliesOfPost(req, res) {
  try {
    const posts = await DiscussionPostNoSql.find({
      $and: [
        { discussionThemeId: req.params.id },
        { parentPostId: req.params.postId },
      ],
    });

    const response = posts.map((post) => ({
      id: post._id.toString(),
      text: post.text,
      datetime: post.datetime,
    }));

    return res.status(200).json(responseJson({ payload: response }));
  } catch (error) {
    return res.status(400).json(responseJson({ error: error.message }));
  }
}
