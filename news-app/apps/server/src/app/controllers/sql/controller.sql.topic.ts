import {
  DiscussionTopic,
  PaginatedResponse,
  CreateDiscussionPayload,
  BaseResponse,
  DiscussionCategory,
  IDiscussionTopicPropsWithCategory,
  DiscussionPost,
} from '@news-app/api-model';
import assert = require('assert');
import { Response, Request } from 'express';
import { col, fn, Op } from 'sequelize';
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
    const topics = await DiscussionTopic.findAll({
      limit: pageSize,
      offset: offset,
      include: [{ model: DiscussionCategory }],
    });
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
    assert(typeof req.body.userId === 'number');
    const topic = await DiscussionTopic.create({
      datetime: req.body.datetime,
      text: req.body.text,
      title: req.body.title,
      userId: req.body.userId,
      discussionCategoryId: req.body.discussionCategoryId as number,
    });
    return res.status(200).json(responseJson({ payload: topic }));
  } catch (error) {
    return res.status(400).json(responseJson({ error: error.message }));
  }
}

export async function getTopicsByNumberOfPosts (req,res) {
  const oneyearafter = new Date();
  oneyearafter.setFullYear(oneyearafter.getFullYear()-1);

  try {
    const pageSize = Number.parseInt(req.query.pageSize as string) || 100;
    const page = Number.parseInt(req.query.page as string) || 0;
    const offset = pageSize * page;
    const topics = await DiscussionTopic.findAll({
     attributes: {
        include: [[fn('count', col('DiscussionPosts.id')), "PostCount"]]
      },
      where: {
        datetime: {[Op.gte]: oneyearafter}
      },
      include: [
        { model: DiscussionCategory }, 
        {
          model: DiscussionPost,
          attributes: [],
          required: false
        }
      ],
      group: ["DiscussionTopic.id"],
      order: [[col("PostCount"), "DESC"], [col("title"), 'ASC']],
    });

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