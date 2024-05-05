import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const DEFAULT_STALE_TIME = 15 * 60 * 1000; // 15 minutes

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: DEFAULT_STALE_TIME,
    },
  },
});

const withTanstackQuery =
  <TProps extends object>(
    Component: React.ComponentType<TProps>,
  ): React.FC<TProps> =>
  (props) => {
    return (
      <QueryClientProvider client={queryClient}>
        <Component {...props} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    );
  };

export default withTanstackQuery;
