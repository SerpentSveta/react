import { create } from 'zustand';

interface TableState {
  baseColumns: string[];
  optionalColumns: string[];
  query: string;
  setQuery: (q: string) => void;
  toggleColumn: (col: string) => void;
}

export const useTableStore = create<TableState>()((set) => ({
  baseColumns: [
    'country',
    'iso_code',
    'year',
    'population',
    'co2',
    'co2_per_capita',
  ],
  optionalColumns: [],
  query: '',
  setQuery: (q) => set({ query: q }),
  toggleColumn: (col) =>
    set((state) => {
      const alreadySelected = state.optionalColumns.includes(col);
      return {
        optionalColumns: alreadySelected
          ? state.optionalColumns.filter((item) => item !== col)
          : [...state.optionalColumns, col],
      };
    }),
}));
