import {
  BaseResponse,
  IUserComplete,
  IUserProps,
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
export async function createUser(user: Omit<IUserComplete, 'id'>) {
  try {
    return UserNoSql.create(user);
  } catch (error) {
    return error;
  }
}
