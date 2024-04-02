import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';

import Router from '@/config/router';
import { Helmet } from 'react-helmet';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24 * 90,
    },
  },
});

const App = () => {
  return (
    <>
      <Helmet>
        <title>Edu Quest</title>
        <meta name='login' content='Login Page' />
      </Helmet>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        />
        <Router />
      </QueryClientProvider>
    </>
  );
};

export default App;
