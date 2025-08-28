import { create } from 'zustand';

interface TableState {
  baseColumns: string[];
  optionalColumns: string[];
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
