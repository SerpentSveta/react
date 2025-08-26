import { UncontrolledForm } from '../forms/UncontrolledForm/UncontrolledForm';
import { render, screen, fireEvent } from '@testing-library/react';

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
  it('empty fields validation', () => {
    render(<UncontrolledForm onSuccess={vi.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(
      screen.getByText(/name must start with an uppercase letter/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/age cannot be negative/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Password must contain at least 1 number/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/You must accept Terms and Conditions/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Country must be from the list/i)
    ).toBeInTheDocument();
  });
});
