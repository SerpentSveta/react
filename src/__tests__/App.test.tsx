import App from '../App';
import { render, screen } from '@testing-library/react';

describe('App component', () => {
  it('renders Header and MainForms components', () => {
    render(<App />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
