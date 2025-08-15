import './normalize.css';
import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App.tsx';

const root = document.getElementById('root');
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1 * 60 * 1000 } },
});

if (!root) {
  throw new Error('Root not found');
} else {
  createRoot(root).render(
    <StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </StrictMode>
  );
}
