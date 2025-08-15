import type { ReactNode, CSSProperties } from 'react';

export type Character = {
  id: number;
  name: string;
  image: string;
};

export type ErrorSearchResult = {
  hasError: boolean;
};

export type Props = {
  page: string;
};

export type ButtonProps = {
  onClick: () => void;
  children: string;
  style?: CSSProperties;
  className?: string;
};

export type ErrorProps = {
  children: ReactNode;
};

export type ErrorState = {
  hasError: boolean;
};

export type Info = {
  count: number;
  next: null | string;
  pages: number;
  prev: null | string;
};

export type PaginationProps = {
  count: number;
  page: number;
  onChange: (page: number) => void;
};

export type CharacterDetails = Character & {
  status: string;
  species: string;
  gender: string;
};

export type ThemeContextType = {
  isDarkTheme: boolean;
  toggleTheme: () => void;
};

export type CardsState = {
  cards: number;
  allSelectedCards: number[];
  selectCard: (id: number) => void;
  unSelectCard: (id: number) => void;
  unselectAllCards: () => void;
};

export type SearchState = {
  results: CharacterDetails[] | null;
  setResults: (results: CharacterDetails[] | null) => void;
};

export type SearchProps = {
  initialPage?: number;
};
