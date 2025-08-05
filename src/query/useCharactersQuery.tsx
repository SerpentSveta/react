import { useQuery } from '@tanstack/react-query';
import { sendRequest, sendRequestCharacterDetails } from '../services/api';

export function useCharactersQuery(name: string, page: number) {
  return useQuery({
    queryKey: ['characters', name, page],
    queryFn: ({ signal }) => sendRequest(name, page, { signal }),
    enabled: !!name && !!page,
  });
}

export function useCharactersDetailsQuery(id?: string) {
  return useQuery({
    queryKey: ['characters-details', id],
    queryFn: ({ signal }) =>
      sendRequestCharacterDetails(id as string, { signal }),
    enabled: !!id,
  });
}
