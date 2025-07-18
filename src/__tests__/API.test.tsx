import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Search } from '../components/Search/Search';
import type { Character } from '../services/types';

beforeEach(() => {
  global.fetch = jest.fn();
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  jest.clearAllMocks();
  (console.error as jest.Mock).mockRestore();
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
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: mockResults }),
    });

    render(<Search />);

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'Morty');

    const searchButton = screen.getByRole('button', { name: /search/i });
    await userEvent.click(searchButton);

    const titleMorty = await screen.findByText(/Morty Smith/i);
    expect(titleMorty).toBeInTheDocument();

    const titleRick = await screen.findByText(/Rick Sanchez/i);
    expect(titleRick).toBeInTheDocument();
  });

  it('Error Case', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API error'));

    render(<Search />);

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

    render(<Search />);

    const searchButton = screen.getByRole('button', { name: /search/i });
    await userEvent.click(searchButton);

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });
});
