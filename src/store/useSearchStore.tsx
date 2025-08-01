import { create } from 'zustand';
import type { SearchState } from '../services/types';

export const useSearchStore = create<SearchState>()((set) => ({
  results: [],
  setResults: (results) => set({ results }),
}));
