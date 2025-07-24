import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('App', () => {
  it('renders App component', () => {
    <MemoryRouter>
      <App />
    </MemoryRouter>;
  });
});
