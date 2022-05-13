import { User } from '@news-app/api-model';
import { Response, Request } from 'express';

/**
 *
 * @param req The request object
 * @param res The response object
 * @returns
 */
export async function getAllUsers(
  req: Request<{}, any, any, qs.ParsedQs, Record<string, any>>,
  res: Response<any, any>
) {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: "Couldn't get users" });
  }
}
