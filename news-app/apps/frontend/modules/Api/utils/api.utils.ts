import { ApiEndpoint, serverUrl } from '../constants/api.constants.endpoint';

export async function baseFetch<T>(
  endpoint: ApiEndpoint,
  body: any,
  options?: Omit<RequestInit, 'body'>
): Promise<T | undefined> {
  const response = await fetch(`${serverUrl}${endpoint}`, {
    ...options,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await response.json();

  if (data.error) {
    return null;
  }

  return data.res as T;
}
