import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Search } from '../components/Search/Search';
import type { Character } from '../services/types';
import { MemoryRouter } from 'react-router-dom';

beforeEach(() => {
  localStorage.clear();
  global.fetch = jest.fn();
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  jest.clearAllMocks();
});

const mockResults: Character[] = [
  {
    id: 1,
    name: 'Morty Smith',
    image: 'morty.png',
  },
  {
    id: 2,
    name: 'Rick Sanchez',
    image: 'rick.png',
  },
];

describe('testing API', () => {
  it('Success Case', async () => {
    localStorage.setItem('inputName', 'Morty');

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: mockResults }),
    });

    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );

    const morty = await screen.findByText(/Morty Smith/i);
    const rick = await screen.findByText(/Rick Sanchez/i);

    expect(morty).toBeInTheDocument();
    expect(rick).toBeInTheDocument();
  });

  it('Error Case', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API error'));

    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );

    const searchButton = screen.getByRole('button', { name: /search/i });
    await userEvent.click(searchButton);

    const errorMessage = await screen.getByText(/Error receive/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('Error 404', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({}),
    });

    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );

    const searchButton = screen.getByRole('button', { name: /search/i });
    await userEvent.click(searchButton);

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });
});
