import { BaseResponse } from '@news-app/api-model';

export function responseJson<T>({
  payload,
  error,
}: {
  payload?: T;
  error?: string;
}): BaseResponse<T> {
  if (error) {
    return { error };
  }
  return { res: payload };
}
