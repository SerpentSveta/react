import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Search } from '../components/Search/Search';

describe('Search Rendering', () => {
  it('Render Titles', () => {
    render(<Search />);
    const searchTitle = screen.getByRole('heading', { name: /Search/i });
    const resultTitle = screen.getByRole('heading', { name: /Results/i });
    expect(searchTitle).toBeInTheDocument();
    expect(resultTitle).toBeInTheDocument();
  });
  it('Render search input', () => {
    render(<Search />);
    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toBeInTheDocument();
  });
  it('Render search button', () => {
    render(<Search />);
    const searchButton = screen.getByRole('button', { name: /Search/i });
    expect(searchButton).toBeInTheDocument();
  });
  it('Displays previously saved search term from localStorage on mount', () => {
    localStorage.setItem('inputName', 'Morty');

    render(<Search />);

    const input = screen.getByRole('textbox');

    expect(input).toHaveValue('Morty');
  });
  it('Shows empty input when no saved term exists', () => {
    localStorage.clear();

    render(<Search />);

    const input = screen.getByRole('textbox');

    expect(input).toHaveValue('');
  });
});
