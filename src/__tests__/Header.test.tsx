import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Header } from '../components/Header/Header';
import { MemoryRouter } from 'react-router-dom';

describe('Header', () => {
  it('Render Logo', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const headerLogo = screen.getByRole('img', { name: /rick and morty/i });
    expect(headerLogo).toBeInTheDocument();
  });

  it('Render theme switch button', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const switchButton = screen.getByRole('button');
    expect(switchButton).toBeInTheDocument();
  });
});
