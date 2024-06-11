import { useState } from 'react';

export enum UseRequestError {
  USE_REQUEST_UNKNOWN_ERROR = 'USE_REQUEST_UNKNOWN_ERROR',
}

export const useRequest = <P extends unknown[], R>(fetchCb: (...args: P) => Promise<R>) => {
  const [data, setData] = useState<R | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const refetch = async (...args: P) => {
    setIsLoading(true);
    setData(null);
    setError(null);
    try {
      const res = await fetchCb(...args);
      setData(res);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError(UseRequestError.USE_REQUEST_UNKNOWN_ERROR);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const clear = () => {
    setData(null);
    setIsLoading(false);
    setError(null);
  };

  return { data, error, isLoading, refetch, clear };
};
