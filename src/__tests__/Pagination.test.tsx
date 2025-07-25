import '@testing-library/jest-dom';
import { Pagination } from '../components/Pagination/Pagination';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Pagination component', () => {
  it('render current page number', () => {
    render(<Pagination count={5} page={3} onChange={() => {}} />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });
  it('render current page number when clicking on the left button', async () => {
    const onChangeMock = jest.fn();
    render(<Pagination count={5} page={3} onChange={onChangeMock} />);

    const leftArrow = screen.getByAltText(/arrow left/i);
    await userEvent.click(leftArrow);

    expect(onChangeMock).toHaveBeenCalledWith(2);
  });
  it('render current page number when clicking on the right button', async () => {
    const onChangeMock = jest.fn();
    render(<Pagination count={5} page={3} onChange={onChangeMock} />);

    const rightArrow = screen.getByAltText(/arrow right/i);
    await userEvent.click(rightArrow);

    expect(onChangeMock).toHaveBeenCalledWith(4);
  });
});
