'use client';
import './Search.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SearchContent } from '../SearchContent/SearchContent';

const queryClient = new QueryClient();

export function Search() {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchContent />
    </QueryClientProvider>
  );
}
