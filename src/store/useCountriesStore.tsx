import { create } from 'zustand';
import type { CountryStore } from '../services/types';

export const useCountryStore = create<CountryStore>((set) => ({
  countries: [],
  selectedCountry: null,
  setCountries: (list) => set({ countries: list }),
  setSelectedCountry: (country) => set({ selectedCountry: country }),
}));
