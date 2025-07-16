import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Header } from '../components/Header/Header';

describe('Header', () => {
  it('Render Logo', () => {
    render(<Header />);
    const headerLogo = screen.getByRole('img', { name: /rick and morty/i });
    expect(headerLogo).toBeInTheDocument();
  });

  it('Render header', () => {
    render(<Header />);
    const headerTitle = screen.getByRole('heading', {
      name: /rick and morty character search/i,
    });
    expect(headerTitle).toBeInTheDocument();
  });
});
