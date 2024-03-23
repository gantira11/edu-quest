import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';

import Router from '@/config/router';

export const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      />
      <Router />
    </QueryClientProvider>
  );
};

export default App;
