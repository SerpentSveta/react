import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Search } from '../components/Search/Search';
import { MemoryRouter } from 'react-router-dom';

describe('Search Rendering', () => {
  it('Render Titles', () => {
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );
    const searchTitle = screen.getByRole('heading', { name: /Search/i });
    const resultTitle = screen.getByRole('heading', { name: /Results/i });
    expect(searchTitle).toBeInTheDocument();
    expect(resultTitle).toBeInTheDocument();
  });
  it('Render search input', () => {
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );
    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toBeInTheDocument();
  });
  it('Render search button', () => {
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );
    const searchButton = screen.getByRole('button', { name: /Search/i });
    expect(searchButton).toBeInTheDocument();
  });
  it('Displays previously saved search term from localStorage on mount', async () => {
    localStorage.setItem('inputName', JSON.stringify('Morty'));

    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );

    const input = await screen.findByRole('textbox');
    expect(input).toHaveValue('Morty');
  });
});
it('Shows empty input when no saved term exists', () => {
  localStorage.clear();

  render(
    <MemoryRouter>
      <Search />
    </MemoryRouter>
  );

  const input = screen.getByRole('textbox');
  expect(input).toHaveValue('');
});

describe('User Interaction Tests', () => {
  it('Updates input value when user types', async () => {
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'Rick');

    expect(input).toHaveValue('Rick');
  });
  it('Saves search term to localStorage when search button is clicked', async () => {
    localStorage.clear();

    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
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
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );

    const input = screen.getByRole('textbox');
    await userEvent.clear(input);
    await userEvent.type(input, 'Rick');

    const searchButton = screen.getByRole('button', { name: /Search/i });
    await userEvent.click(searchButton);

    expect(localStorage.getItem('inputName')).toBe(JSON.stringify('Rick'));
  });
});

describe('query generation', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('request with an entered name', async () => {
    localStorage.clear();

    (global.fetch as jest.Mock).mockResolvedValue({
      json: async () => ({ results: [] }),
    });

    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'Rick');

    const searchButton = screen.getByRole('button', { name: /Search/i });
    await userEvent.click(searchButton);

    expect(global.fetch).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character/?name=Rick&page=1'
    );
  });

  it('request with an empty name', async () => {
    localStorage.clear();

    (global.fetch as jest.Mock).mockResolvedValue({
      json: async () => ({ results: [] }),
    });

    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );

    const searchButton = screen.getByRole('button', { name: /Search/i });
    await userEvent.click(searchButton);

    expect(global.fetch).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character/?name=&page=1'
    );
  });
});
