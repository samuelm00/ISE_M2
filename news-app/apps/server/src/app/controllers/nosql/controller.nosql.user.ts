import {
  BaseResponse,
  DiscussionTopicNoSql,
  IDiscussionTopicPropsWithCategory,
  IUserComplete,
  IUserProps,
  PaginatedResponse,
  UserNoSql,
} from '@news-app/api-model';
import { Response, Request } from 'express';
import { responseJson } from '../../util/util.response';

/**
 *
 * @param req
 * @param res
 * @returns
 */
export async function getAllUsers(
  req: Request<{}, any, any, qs.ParsedQs, Record<string, any>>,
  res: Response<BaseResponse<IUserProps[]>, any>
) {
  try {
    const users = await UserNoSql.find();
    const response: IUserProps[] = users.map((user) => ({
      id: user._id.toString(),
      email: user.email,
    }));
    return res.status(200).json(responseJson({ payload: response }));
  } catch (error) {
    return res.status(400).json(responseJson({ error: error.message }));
  }
}

/**
 *
 * @param user
 * @returns
 */
/*
export async function createUser(user: Omit<IUserComplete, 'id'>) {
  try {
    return UserNoSql.create(user);
  } catch (error) {
    return undefined;
  }
}
*/

export async function getWrittenTopics(req,res) {

  try {
    const id = req.params.id;
    const pageSize = Number.parseInt(req.query.pageSize as string) || 100;
    const page = Number.parseInt(req.query.page as string) || 0;
    const offset = pageSize * page;

    const topics = await DiscussionTopicNoSql.aggregate()
      .match({userId: id})
      .lookup({ from: 'discussioncategories', localField: 'discussionCategory', foreignField: '_id', as: 'discussionCategory' })
      .unwind('discussionCategory')
      .sort({'discussionCategory.name': 1})
      .skip(offset)
      .limit(pageSize);
    
      const response: PaginatedResponse<IDiscussionTopicPropsWithCategory> = {
        page: page + 1,
        pageSize: pageSize,
        data: topics.map((topic) => ({
          datetime: topic.datetime,
          id: topic._id.toString(),
          text: topic.text,
          title: topic.title,
          userId: topic.userId,
          // @ts-ignore
          category: topic.discussionCategory,
        })),
      };
    return res.status(200).json(responseJson({ payload: response }));
  } catch (error) {
    return res.status(400).json(responseJson({ error: error.message }));
  }
}