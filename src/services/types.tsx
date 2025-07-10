export type SearchState = {
  name: string;
};

export type Character = {
  id: number;
  name: string;
  image: string;
};

export type Props = {
  results: Character[];
};
