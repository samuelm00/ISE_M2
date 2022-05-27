import {
  DiscussionCategory,
  IDiscussionCategoryProps,
} from '@news-app/api-model';
import { Request, Response } from 'express';

/**
 *
 * @param req
 * @param res
 */
export function getAllCategories(req, res) {
  // load from db
  const categories: IDiscussionCategoryProps[] = [];

  res.json(categories);
}

/**
 *
 * @param req
 * @param res
 * @returns
 */
export function createCategory(
  req: Request<{}, any, any, qs.ParsedQs, Record<string, any>>,
  res: Response<any, any>
) {
  const category: IDiscussionCategoryProps = req.body;
  DiscussionCategory.create(category);
  return res.status(200).json(category);
}

/**
 *
 * @param req
 * @param res
 */
export function getCategoryByID(req, res) {
  const id: number = req.params.id;
  // load from db
  const category: IDiscussionCategoryProps = null;

  res.json(category);
}
