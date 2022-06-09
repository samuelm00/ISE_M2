import {
  DiscussionTopic,
  PaginatedResponse,
  CreateDiscussionPayload,
  BaseResponse,
  IDiscussionTopicPropsWithCategory,
  DiscussionTopicNoSql,
  IDiscussionTopicProps,
} from '@news-app/api-model';
import assert = require('assert');
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
  res: Response<
    BaseResponse<PaginatedResponse<IDiscussionTopicPropsWithCategory>>,
    any
  >
) {
  try {
    const pageSize = Number.parseInt(req.query.pageSize as string) || 100;
    const page = Number.parseInt(req.query.page as string) || 0;
    const offset = pageSize * page;
    const topics = await DiscussionTopicNoSql.find(
      {},
      {},
      { skip: offset, limit: pageSize }
    ).populate('discussionCategory');
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

/**
 *
 * @param req The request object
 * @param res The response object
 * @returns
 */
export async function getTopic(
  req: Request<{ id: string }, any, any, qs.ParsedQs, Record<string, any>>,
  res: Response<BaseResponse<IDiscussionTopicProps>, any>
) {
  try {
    const response = await (
      await DiscussionTopicNoSql.findById(req.params.id)
    ).populated('discussionCategory');
    return res.status(200).json(
      responseJson({
        payload: {
          datetime: response.datetime,
          discussionCategoryId: response.discussionCategory.id,
          id: response._id.toString(),
          text: response.text,
          title: response.title,
          userId: response.userId,
        },
      })
    );
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
  res: Response<BaseResponse<IDiscussionTopicProps>, any>
) {
  try {
    assert(typeof req.body.userId === 'number');
    const topic = await DiscussionTopicNoSql.create({
      datetime: req.body.datetime,
      text: req.body.text,
      title: req.body.title,
      userId: req.body.userId,
      discussionCategoryId: req.body.discussionCategoryId,
    });
    return res.status(200).json(
      responseJson({
        payload: {
          datetime: topic.datetime,
          discussionCategoryId: topic.discussionCategory.id,
          id: topic._id.toString(),
          text: topic.text,
          title: topic.title,
          userId: topic.userId,
        },
      })
    );
  } catch (error) {
    return res.status(400).json(responseJson({ error: error.message }));
  }
}
