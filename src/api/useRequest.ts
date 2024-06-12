import { useState } from 'react';

export enum UseRequestError {
  USE_REQUEST_UNKNOWN_ERROR = 'USE_REQUEST_UNKNOWN_ERROR',
}

export const useRequest = <P extends unknown[], R>(req: { fetchCb: (...args: P) => Promise<R> }) => {
  const [data, setData] = useState<R | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const run = async (args: P, options?: { onSuccess?: () => void }) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await req.fetchCb(...args);
      setData(res);
      if (options?.onSuccess) {
        options.onSuccess();
      }
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

  return { data, error, isLoading, run, clear };
};
