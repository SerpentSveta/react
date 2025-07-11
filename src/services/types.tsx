export type Character = {
  id: number;
  name: string;
  image: string;
};

export type SearchState = {
  name: string;
  results: Character[] | null;
  loading: boolean;
};

export type Props = {
  results: Character[] | null;
};

export type ButtonProps = {
  onClick: () => void;
  children: string;
};
