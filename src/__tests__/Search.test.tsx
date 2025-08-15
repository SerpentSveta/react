import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Search } from '../components/Search/Search';
import { MemoryRouter } from 'react-router-dom';
import { useCharactersQuery } from '../query/useCharactersQuery';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('../query/useCharactersQuery', () => ({
  useCharactersQuery: jest.fn(),
}));

const queryClient = new QueryClient();

describe('Search Rendering', () => {
  beforeEach(() => {
    (useCharactersQuery as jest.Mock).mockReturnValue({
      data: {
        results: [],
        info: { pages: 1 },
      },
      isPending: false,
      error: null,
    });
  });

  it('Render Titles', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Search />
        </MemoryRouter>
      </QueryClientProvider>
    );
    const searchTitle = screen.getByRole('heading', { name: /Search/i });
    const resultTitle = screen.getByRole('heading', { name: /Results/i });
    expect(searchTitle).toBeInTheDocument();
    expect(resultTitle).toBeInTheDocument();
  });
  it('Render search input', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Search />
        </MemoryRouter>
      </QueryClientProvider>
    );
    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toBeInTheDocument();
  });
  it('Render search button', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Search />
        </MemoryRouter>
      </QueryClientProvider>
    );
    const searchButton = screen.getByRole('button', { name: /Search/i });
    expect(searchButton).toBeInTheDocument();
  });
  it('Displays previously saved search term from localStorage on mount', async () => {
    localStorage.setItem('inputName', JSON.stringify('Morty'));

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Search />
        </MemoryRouter>
      </QueryClientProvider>
    );

    const input = await screen.findByRole('textbox');
    expect(input).toHaveValue('Morty');
  });
});
it('Shows empty input when no saved term exists', () => {
  localStorage.clear();

  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    </QueryClientProvider>
  );

  const input = screen.getByRole('textbox');
  expect(input).toHaveValue('');
});

describe('User Interaction Tests', () => {
  it('Updates input value when user types', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Search />
        </MemoryRouter>
      </QueryClientProvider>
    );

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'Rick');

    expect(input).toHaveValue('Rick');
  });
  it('Saves search term to localStorage when search button is clicked', async () => {
    localStorage.clear();

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Search />
        </MemoryRouter>
      </QueryClientProvider>
    );

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'Rick');

    const searchButton = screen.getByRole('button', { name: /Search/i });
    await userEvent.click(searchButton);

    expect(localStorage.getItem('inputName')).toBe(JSON.stringify('Rick'));
  });
});

describe('LocalStorage Integration', () => {
  it('Overwrites existing localStorage value when new search is performed', async () => {
    localStorage.setItem('inputName', 'Morty');
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Search />
        </MemoryRouter>
      </QueryClientProvider>
    );

    const input = screen.getByRole('textbox');
    await userEvent.clear(input);
    await userEvent.type(input, 'Rick');

    const searchButton = screen.getByRole('button', { name: /Search/i });
    await userEvent.click(searchButton);

    expect(localStorage.getItem('inputName')).toBe(JSON.stringify('Rick'));
  });
});
