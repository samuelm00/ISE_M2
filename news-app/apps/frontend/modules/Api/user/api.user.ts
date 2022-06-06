import { baseFetch } from '../utils/api.utils';

export async function getAllUsers(nodeFetch?: boolean) {
  return baseFetch(
    '/api/sql/users',
    null,
    {
      method: 'GET',
    },
    nodeFetch
  );
}
