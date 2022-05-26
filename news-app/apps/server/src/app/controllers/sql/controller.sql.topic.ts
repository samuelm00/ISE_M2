import {
  DiscussionTopic,
  IUserComplete,
  IUserProps,
  User,
  PaginatedPayload,
  PaginatedResponse,
  IDiscussionTopicProps,
  CreateDiscussionPayload,
} from '@news-app/api-model';
import { Response, Request } from 'express';
import { responseJson } from '../../util/util.response';

/**
 *
 * @param req The request object
 * @param res The response object
 * @returns
 */
export async function getTopics(
  req: Request<{}, any, PaginatedPayload, qs.ParsedQs, Record<string, any>>,
  res: Response<any, any>
) {
  try {
    const { pageSize, page } = req.body;
    const offset = pageSize * page;
    const topics = await DiscussionTopic.findAll({ limit: pageSize, offset });
    const response: PaginatedResponse<IDiscussionTopicProps> = {
      page: page + 1,
      pageSize: pageSize,
      data: topics.map((topic) => ({
        datetime: topic.datetime,
        id: topic.id,
        text: topic.text,
        title: topic.title,
        user: topic.user as any,
      })),
    };
    return res.status(200).json(responseJson({ payload: response }));
  } catch (error) {
    return res.status(400).json(responseJson({ error: error.message }));
  }
}

/**
 *
 * @param req The request object
 * @param res The response object
 * @returns
 */
export async function getTopic(
  req: Request<{ id: string }, any, any, qs.ParsedQs, Record<string, any>>,
  res: Response<any, any>
) {
  try {
    const response = DiscussionTopic.findByPk(req.params.id);
    return res.status(200).json(responseJson({ payload: response }));
  } catch (error) {
    return res.status(400).json(responseJson({ error: error.message }));
  }
}

/**
 *
 * @param req
 * @param res
 * @returns
 */
export async function createTopic(
  req: Request<
    {},
    any,
    CreateDiscussionPayload,
    qs.ParsedQs,
    Record<string, any>
  >,
  res: Response<any, any>
) {
  try {
    const topic = DiscussionTopic.create({
      datetime: new Date(),
      text: req.body.text,
      title: req.body.title,
      user: req.body.userId,
    });
    return res.status(200).json(responseJson({ payload: topic }));
  } catch (error) {
    return res.status(400).json(responseJson({ error: error.message }));
  }
}
