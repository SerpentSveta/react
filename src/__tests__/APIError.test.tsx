import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Search } from '../components/Search/Search';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

beforeEach(() => {
  localStorage.clear();
  global.fetch = jest.fn();
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  jest.clearAllMocks();
});

jest.mock('../query/useCharactersQuery', () => ({
  useCharactersQuery: () => ({
    data: {
      results: [
        { id: 1, name: 'Morty Smith', image: 'morty.png' },
        { id: 2, name: 'Rick Sanchez', image: 'rick.png' },
      ],
      info: { pages: 1 },
    },
    isPending: false,
    error: new Error('Something went wrong'),
  }),
}));

describe('testing API', () => {
  it('Error Case', async () => {
    jest.mock('../query/useCharactersQuery', () => ({
      useCharactersQuery: () => ({
        data: {
          results: [
            { id: 1, name: 'Morty Smith', image: 'morty.png' },
            { id: 2, name: 'Rick Sanchez', image: 'rick.png' },
          ],
          info: { pages: 1 },
        },
        isPending: false,
        error: new Error('Something went wrong'),
      }),
    }));

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Search />
        </MemoryRouter>
      </QueryClientProvider>
    );

    const errorMessage = await screen.findByText(/An error has occurred/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
