'use client';
import './Search.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SearchContent } from '../SearchContent/SearchContent';

const queryClient = new QueryClient();

export function Search({ initialPage }: { initialPage?: number }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchContent initialPage={initialPage} />
    </QueryClientProvider>
  );
}
