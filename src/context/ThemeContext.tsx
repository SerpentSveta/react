import { createContext } from 'react';
import type { ThemeContextType } from '../services/types';

export const ThemeContext = createContext<ThemeContextType>({
  isDarkTheme: false,
  toggleTheme: () => {},
});
