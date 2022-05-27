import {
  BaseResponse,
  IUserComplete,
  IUserProps,
  User,
} from '@news-app/api-model';
import { Response, Request } from 'express';
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
