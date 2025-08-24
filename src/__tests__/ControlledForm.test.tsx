import { ControlledForm } from '../forms/ControlledForm/ControlledForm';
import { render, screen } from '@testing-library/react';

describe('ControlledForm', () => {
  it('renders all required fields', () => {
    render(<ControlledForm onSuccess={vi.fn()} />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password:$/i)).toBeInTheDocument();
    expect(screen.getByText(/gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });
});
