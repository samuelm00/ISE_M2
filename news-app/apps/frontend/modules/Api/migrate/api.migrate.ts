import { baseFetch } from '../utils/api.utils';

/**
 *
 * @returns
 */
export async function migrate() {
  async () => {};
  try {
    return baseFetch(
      `/api/nosql/migration`,
      {},
      {
        method: 'POST',
      }
    );
  } catch (error) {
    return undefined;
  }
}
