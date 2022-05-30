import { BaseResponse } from '@news-app/api-model';
import { useEffect, useState } from 'react';

export function useFetch<T>(fetchFunction: () => Promise<T>) {
  const [data, setData] = useState<T>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchFunction()
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [fetchFunction]);

  return { data, setData, error, isLoading };
}
