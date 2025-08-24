import { UncontrolledForm } from '../forms/UncontrolledForm/UncontrolledForm';
import { render, screen } from '@testing-library/react';

describe('UncontrolledForm', () => {
  it('renders all required fields', () => {
    render(<UncontrolledForm onSuccess={vi.fn()} />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password:$/i)).toBeInTheDocument();
    expect(screen.getByText(/gender/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });
});
