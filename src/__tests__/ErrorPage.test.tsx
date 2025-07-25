import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { ErrorPage } from '../components/ErrorPage/ErrorPage';
import { render, screen } from '@testing-library/react';

describe('ErrorPage component', () => {
  it('render all fields', () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );

    const img = screen.getByRole('img', { name: /Rick and Morty/i });
    expect(img).toBeInTheDocument();

    const text = screen.getByText(/It looks like nothing/i);
    expect(text).toBeInTheDocument();
  });
});
