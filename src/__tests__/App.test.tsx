import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../App';
import { useCharactersQuery } from '../query/useCharactersQuery';

jest.mock('../query/useCharactersQuery', () => ({
  useCharactersQuery: jest.fn(),
}));

describe('App', () => {
  const queryClient = new QueryClient();

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

  it('renders App component', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(
      screen.getByRole('heading', { name: /Rick and Morty character search/i })
    ).toBeInTheDocument();
  });

  it('navigates from About to Home page', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/about']}>
          <App />
        </MemoryRouter>
      </QueryClientProvider>
    );

    const button = screen.getByRole('button', { name: /home/i });
    await userEvent.click(button);

    const title = await screen.findByRole('heading', {
      name: /Rick and Morty character search/i,
      level: 1,
    });
    expect(title).toBeInTheDocument();
  });

  it('switch theme', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </QueryClientProvider>
    );

    const button = screen.getByRole('button', { name: /theme/i });
    await userEvent.click(button);

    const main = screen.getByRole('main');
    expect(main).toHaveClass('main--dark');
  });
});
