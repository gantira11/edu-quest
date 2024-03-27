import React from 'react';
import ReactDOM from 'react-dom/client';
import { setLocale } from 'yup';

import { customValidationMessage } from '@/shared/utils/custom-validation-message';

import './index.css';
import 'react-quill/dist/quill.snow.css';
import App from './App';
import { QueryClient } from '@tanstack/react-query';
import { registerSW } from 'virtual:pwa-register';

setLocale(customValidationMessage);

export const queryClient = new QueryClient();

if ('serviceWorker' in navigator) {
  const updateSW = registerSW({
    onNeedRefresh() {
      updateSW(true);
      console.log('READY FOR REFRESH');
    },
    onOfflineReady() {
      console.log('OFFLINE READY');
    },
    
    immediate: true,
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
