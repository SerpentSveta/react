import type { ReactNode, CSSProperties } from 'react';

export type Character = {
  id: number;
  name: string;
  image: string;
};

export type SearchState = {
  name: string;
  results: Character[] | null;
  loading: boolean;
  error: string | null;
};

export type ErrorSearchResult = {
  hasError: boolean;
};

export type Props = {
  results: Character[] | null;
};

export type ButtonProps = {
  onClick: () => void;
  children: string;
  style?: CSSProperties;
};

export type ErrorProps = {
  children: ReactNode;
};

export type ErrorState = {
  hasError: boolean;
};
