import { QueryCache, QueryClient, QueryClientConfig } from '@tanstack/react-query';

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      console.error('Error happened: ', error);
    },
  }),
};

export const reactQueryClient = new QueryClient(queryClientConfig);