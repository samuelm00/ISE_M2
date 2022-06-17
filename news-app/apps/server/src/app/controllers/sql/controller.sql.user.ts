import {
  BaseResponse,
  DiscussionCategory,
  DiscussionTopic,
  IDiscussionTopicPropsWithCategory,
  IUserComplete,
  IUserProps,
  PaginatedResponse,
  User,
} from '@news-app/api-model';
import { Response, Request } from 'express';
import { col } from 'sequelize';
import { responseJson } from '../../util/util.response';

/**
 *
 * @param req The request object
 * @param res The response object
 * @returns
 */
export async function getAllUsers(
  req: Request<{}, any, any, qs.ParsedQs, Record<string, any>>,
  res: Response<BaseResponse<IUserProps[]>, any>
) {
  try {
    const users = await User.findAll();
    const response: IUserProps[] = users.map((user) => ({
      id: user.id,
      email: user.email,
    }));
    return res.status(200).json(responseJson({ payload: response }));
  } catch (error) {
    return res.status(400).json(responseJson({ error: error.message }));
  }
}

/**
 *
 * @param param0 The request object {@link Omit<IUserComplete, 'id'>}
 * @returns The user object if the user is created, otherwise undefined
 */
export async function createUser({
  email,
  password,
}: Omit<IUserComplete, 'id'>) {
  try {
    const user = await User.create({ email, password });
    return user;
  } catch (error) {
    return undefined;
  }
}

export async function getWrittenTopics(req,res) {

  try {
    console.log(req.params.id);
    const id = Number.parseInt(req.params.id as string);
    const pageSize = Number.parseInt(req.query.pageSize as string) || 100;
    const page = Number.parseInt(req.query.page as string) || 0;
    const offset = pageSize * page;
    console.log("Before Query");
    console.log(typeof(id));
    const topics = await DiscussionTopic.findAll({
      where: {
        userId: id,
      },
      include: [
        { model: DiscussionCategory}, 
        {
          model: User,
          attributes: [],
        }
      ],
      order: [[col("DiscussionCategory.name"), "ASC"]],
      limit: pageSize,
      offset: offset,
    });

    console.log("After Query");
    const response: PaginatedResponse<IDiscussionTopicPropsWithCategory> = {
      page: page + 1,
      pageSize: pageSize,
      data: topics.map((topic) => ({
        datetime: topic.datetime,
        id: topic.id,
        text: topic.text,
        title: topic.title,
        userId: topic.userId,
        // @ts-ignore
        category: topic.DiscussionCategory,
      })),
    };
    return res.status(200).json(responseJson({ payload: response }));
  } catch (error) {
    return res.status(400).json(responseJson({ error: error.message }));
  }
}
