import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('App', () => {
  it('renders App component', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /Rick and Morty character search/i })
    ).toBeInTheDocument();
  });

  it('navigates from About to Home page', async () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /home/i });
    await userEvent.click(button);

    const title = await screen.findByRole('heading', {
      name: /Rick and Morty character search/i,
      level: 1,
    });
    expect(title).toBeInTheDocument();
  });
});
