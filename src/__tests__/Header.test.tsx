import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Header } from '../components/Header/Header';

describe('Header', () => {
  it('renders Header component', () => {
    render(<Header />);

    screen.debug();
  });
});
