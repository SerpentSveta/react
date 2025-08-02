const BASE_URL = 'https://rickandmortyapi.com/api/character/';

export const sendRequest = async (charName: string, page: number) => {
  if (charName === undefined) return;

  const response = await fetch(`${BASE_URL}?name=${charName}&page=${page}`);

  if (!response.ok) {
    throw new Error(`Download error: ${response.status}`);
  }

  const data = await response.json();

  return data;
};
