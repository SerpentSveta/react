import { create } from 'zustand';
import type { CountryStore } from '../services/types';
import { countryList } from '../data/country-list';

export const useCountryStore = create<CountryStore>((set) => ({
  countries: countryList,
  setCountries: (countries) => set({ countries }),
}));
