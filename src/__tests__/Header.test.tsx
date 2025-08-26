import { Header } from '../components/Header/Header';
import { render, screen } from '@testing-library/react';

describe('Header', () => {
  it('renders buttons', () => {
    render(<Header />);
    expect(
      screen.getByRole('button', { name: /uncontrolled form/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /^Controlled form$/i })
    ).toBeInTheDocument();
  });
});
