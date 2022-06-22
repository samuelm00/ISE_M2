import {
  DiscussionCategory,
  IDiscussionCategoryProps,
} from '@news-app/api-model';
import { Request, Response } from 'express';
import { responseJson } from '../../util/util.response';

/**
 *
 * @param req
 * @param res
 */
export async function getAllCategories(req, res) {
  const categories: DiscussionCategory[] = await DiscussionCategory.findAll();

  const response: IDiscussionCategoryProps[] = categories.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
  }));

  return res.status(200).json(responseJson({ payload: response }));
}

/**
 *
 * @param req
 * @param res
 * @returns
 */
/*
export function createCategory(
  req: Request<{}, any, any, qs.ParsedQs, Record<string, any>>,
  res: Response<any, any>
) {
  const category: Omit<IDiscussionCategoryProps, 'id'> = req.body;
  DiscussionCategory.create(category);
  return res.status(200).json(category);
}
*/
/**
 *
 * @param req
 * @param res
 */
export async function getCategoryByID(req, res) {
  const id = req.params.id;

  const category: DiscussionCategory = await DiscussionCategory.findByPk(id);

  const response: IDiscussionCategoryProps = {
    id: category.id,
    name: category.name,
    description: category.description,
  };

  return res.status(200).json(responseJson({ payload: response }));
}
