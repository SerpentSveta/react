import { useQuery } from '@tanstack/react-query';
import { sendRequest } from '../services/api';

export function useCharactersQuery(name: string, page: number) {
  return useQuery({
    queryKey: ['characters', name, page],
    queryFn: ({ signal }) => sendRequest(name, page, { signal }),
  });
}
