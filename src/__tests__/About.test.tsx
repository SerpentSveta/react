import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { About } from '../components/About/About';
import { render, screen } from '@testing-library/react';

describe('About component', () => {
  it('render all fields', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    const title = screen.getByRole('heading', {
      name: /svetlana aleksandrova/i,
    });
    expect(title).toBeInTheDocument();

    const position = screen.getByText(/developer, designer/i);
    expect(position).toBeInTheDocument();

    const text = screen.getByText(/my name is svetlana/i);
    expect(text).toBeInTheDocument();

    const img = screen.getByRole('img', { name: /rs school/i });
    expect(img).toBeInTheDocument();

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
  });
});
