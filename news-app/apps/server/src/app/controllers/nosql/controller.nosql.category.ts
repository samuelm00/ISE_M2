import {
  BaseResponse,
  DiscussionCategoryNoSql,
  IDiscussionCategoryProps,
} from '@news-app/api-model';
import { Response, Request } from 'express';
import { responseJson } from '../../util/util.response';

/**
 *
 * @param req
 * @param res
 * @returns
 */
export async function getAllCategories(
  req: Request<{}, any, any, qs.ParsedQs, Record<string, any>>,
  res: Response<BaseResponse<IDiscussionCategoryProps[]>, any>
) {
  try {
    const categories = await DiscussionCategoryNoSql.find().sort({ name: 1 });
    const response: IDiscussionCategoryProps[] = categories.map((category) => ({
      id: category._id.toString(),
      description: category.description,
      name: category.name,
    }));
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
export async function getCategoryByID(
  req: Request<{ id: string }, any, any, qs.ParsedQs, Record<string, any>>,
  res: Response<BaseResponse<IDiscussionCategoryProps>, any>
) {
  try {
    const id = req.params.id;
    const category = await DiscussionCategoryNoSql.findById(id);
    const response: IDiscussionCategoryProps = {
      id: category._id.toString(),
      description: category.description,
      name: category.name,
    };
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
export async function createCategory(
  req: Request<
    {},
    any,
    Omit<IDiscussionCategoryProps, 'id'>,
    qs.ParsedQs,
    Record<string, any>
  >,
  res: Response<BaseResponse<IDiscussionCategoryProps>, any>
) {
  try {
    const category = req.body;
    const newCategory = await DiscussionCategoryNoSql.create(category);
    const response: IDiscussionCategoryProps = {
      id: newCategory._id.toString(),
      description: newCategory.description,
      name: newCategory.name,
    };
    return res.status(200).json(responseJson({ payload: response }));
  } catch (error) {
    return res.status(400).json(responseJson({ error: error.message }));
  }
}
