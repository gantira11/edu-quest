import {
  QueryClient,
  QueryClientProvider,
  // QueryClientProvider
} from '@tanstack/react-query';
// import {
  // PersistQueryClientProvider,
  // persistQueryClient,
// } from '@tanstack/react-query-persist-client';
// import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { SnackbarProvider } from 'notistack';

// import { compress, decompress } from 'lz-string';

import Router from '@/config/router';

// export const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: { gcTime: 1000 * 60 * 60 * 365 },
//   },
// });

// const localStoragePersister = createSyncStoragePersister({
//   storage: window.localStorage,
//   serialize: (data) => compress(JSON.stringify(data)),
//   deserialize: (data) => JSON.parse(decompress(data)),
// });

// // persistQueryClient({
// //   queryClient,
// //   persister: localStoragePersister,
// //   maxAge: Infinity,
// // });

// // const persister = createSyncStoragePersister({
// //   storage: window.localStorage,
// // });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24 * 90, // 3 Month
    },
  },
});

// 2. the persister
// const persister = createSyncStoragePersister({
//   storage: window.localStorage,
// });

const App = () => {
  return (
    // <PersistQueryClientProvider
    //   client={queryClient}
    //   persistOptions={{ persister }}
    // >
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      />
      <Router />
    </QueryClientProvider>
    // </PersistQueryClientProvider>
  );
};

export default App;
