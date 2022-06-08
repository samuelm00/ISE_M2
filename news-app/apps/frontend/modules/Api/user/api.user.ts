import { IUserProps } from '@news-app/api-model';
import { DbVariant } from 'apps/frontend/provider/Db/DbProvider';
import { baseFetch } from '../utils/api.utils';

export async function getAllUsers(dbVariant: DbVariant, nodeFetch?: boolean) {
  return baseFetch<IUserProps[]>(
    `/api/${dbVariant}/users`,
    null,
    {
      method: 'GET',
    },
    nodeFetch
  );
}
