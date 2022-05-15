import { baseFetch } from '../utils/api.utils';

export async function getAllUsers() {
  return baseFetch('/api/sql/users', null, {
    method: 'GET',
  });
}
