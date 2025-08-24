import { ControlledForm } from '../forms/ControlledForm/ControlledForm';
import { render, screen, fireEvent } from '@testing-library/react';

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
  it('empty fields validation', async () => {
    render(<ControlledForm onSuccess={vi.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(
      await screen.findByText(/name must start with an uppercase letter/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/age must be a number/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/Password must contain at least 1 number/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/You must accept Terms and Conditions/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Country must be selected from the list/i)
    ).toBeInTheDocument();
  });
});
