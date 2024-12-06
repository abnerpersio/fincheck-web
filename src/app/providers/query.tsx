import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

type Props = {
  children: React.ReactNode;
};

export function QueryProvider(props: Props) {
  const { children } = props;

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      <ReactQueryDevtools position="right" buttonPosition="bottom-right" />
    </QueryClientProvider>
  );
}
