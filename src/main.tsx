import React from 'react';
import ReactDOM from 'react-dom/client';
import { setLocale } from 'yup';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';

import Router from '@/config/router';
import { customValidationMessage } from '@/shared/utils/custom-validation-message';

import './index.css';
import 'react-quill/dist/quill.snow.css';

setLocale(customValidationMessage);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      />
      <Router />
    </QueryClientProvider>
  </React.StrictMode>
);
