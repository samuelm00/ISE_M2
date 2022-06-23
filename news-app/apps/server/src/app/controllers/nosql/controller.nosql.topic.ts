import {
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
    const response = await DiscussionTopicNoSql.findById(
      req.params.id
    ).populate('discussionCategory');
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
    const topic = await DiscussionTopicNoSql.create({
      datetime: req.body.datetime,
      text: req.body.text,
      title: req.body.title,
      userId: req.body.userId,
      discussionCategory: req.body.discussionCategoryId,
    });
    return res.status(200).json(
      responseJson({
        payload: {
          datetime: topic.datetime,
          discussionCategoryId: req.body.discussionCategoryId,
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

export async function getTopicsByNumberOfPosts (req,res) {
  const oneyearafter = new Date();
  oneyearafter.setFullYear(oneyearafter.getFullYear()-1);

  try{
    const pageSize = Number.parseInt(req.query.pageSize as string) || 100;
    const page = Number.parseInt(req.query.page as string) || 0;
    const topics = await DiscussionTopicNoSql.aggregate()
      .match({datetime: { $gte: oneyearafter}})
      .sort({postsCount : -1}, )
      .lookup({ from: 'discussioncategories', localField: 'discussionCategory', foreignField: '_id', as: 'discussionCategory' })
      .unwind('discussionCategory');
    
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