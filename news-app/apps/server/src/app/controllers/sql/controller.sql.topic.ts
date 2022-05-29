import {
  DiscussionTopic,
  PaginatedPayload,
  PaginatedResponse,
  IDiscussionTopicProps,
  CreateDiscussionPayload,
  BaseResponse,
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
  req: Request<{}, any, {}, qs.ParsedQs, Record<string, any>>,
  res: Response<BaseResponse<PaginatedResponse<IDiscussionTopicProps>>, any>
) {
  try {
    const pageSize = Number.parseInt(req.query.pageSize as string) || 100;
    const page = Number.parseInt(req.query.page as string) || 0;
    const offset = pageSize * page;
    const topics = await DiscussionTopic.findAll({
      limit: pageSize,
      offset: offset,
    });
    const response: PaginatedResponse<IDiscussionTopicProps> = {
      page: page + 1,
      pageSize: pageSize,
      data: topics.map((topic) => ({
        datetime: topic.datetime,
        id: topic.id,
        text: topic.text,
        title: topic.title,
        userId: topic.userId,
        discussionCategoryId: topic.discussionCategoryId,
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
  res: Response<BaseResponse<DiscussionTopic>, any>
) {
  try {
    const response = await DiscussionTopic.findByPk(req.params.id);
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
  res: Response<BaseResponse<DiscussionTopic>, any>
) {
  try {
    console.log(req.body);
    const topic = await DiscussionTopic.create({
      datetime: req.body.datetime,
      text: req.body.text,
      title: req.body.title,
      userId: req.body.userId,
      discussionCategoryId: req.body.discussionCategoryId,
    });
    return res.status(200).json(responseJson({ payload: topic }));
  } catch (error) {
    return res.status(400).json(responseJson({ error: error.message }));
  }
}
