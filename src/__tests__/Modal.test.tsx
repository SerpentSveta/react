import { Modal } from '../components/Modal/Modal';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';

describe('Modal', () => {
  it('renders children when isShowing is true', () => {
    const hide = vi.fn();
    render(
      <Modal isShowing={true} hide={hide} modalRef={createRef()}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.getByText('Modal Content')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
  it('does not render modal when isShowing is false', () => {
    const hide = vi.fn();
    render(
      <Modal isShowing={false} hide={hide} modalRef={createRef()}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });
});
