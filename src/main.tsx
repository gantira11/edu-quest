import React from 'react';
import ReactDOM from 'react-dom/client';
import { setLocale } from 'yup';

import { customValidationMessage } from '@/shared/utils/custom-validation-message';

import './index.css';
import 'react-quill/dist/quill.snow.css';
import App from './App';
import { QueryClient } from '@tanstack/react-query';

setLocale(customValidationMessage);

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <QueryClientProvider client={queryClient}>
      <SnackbarProvider
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      />
      <Router />
    </QueryClientProvider> */}
    <App />
  </React.StrictMode>
);
