import {
  ApiEndpoint,
  nodeServerUrl,
  serverUrl,
} from '../constants/api.constants.endpoint';

export async function baseFetch<T>(
  endpoint: ApiEndpoint,
  body: any,
  options?: Omit<RequestInit, 'body'>,
  nodeFetch?: boolean
): Promise<T | undefined> {
  const response = await fetch(
    `${nodeFetch ? nodeServerUrl : serverUrl}${endpoint}`,
    {
      ...options,
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    }
  );
  const data = await response.json();

  if (data.error) {
    return null;
  }

  return data.res as T;
}
