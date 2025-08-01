import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Flyout } from '../components/Flyout/Flyout';
import type { CharacterDetails, CardsState } from '../services/types';

jest.mock('../store/useSearchStore', () => ({
  useSearchStore: jest.fn(),
}));

import { useSearchStore } from '../store/useSearchStore';

jest.mock('../store/useCardsStore', () => ({
  useCardsStore: jest.fn(),
}));

import { useCardsStore } from '../store/useCardsStore';

const mockResults: CharacterDetails[] = [
  {
    id: 1,
    name: 'Beth Smith',
    image: 'beth-smith.png',
    status: 'Alive',
    species: 'Human',
    gender: 'Female',
  },
  {
    id: 2,
    name: 'Rick Sanchez',
    image: 'rick.png',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
  },
];

describe('Flyout Component', () => {
  const mockUnselectAllCards = jest.fn();
  const mockSelectCard = jest.fn();
  const mockUnSelectCard = jest.fn();

  beforeEach(() => {
    (useCardsStore as unknown as jest.Mock).mockImplementation(
      (selector: (state: CardsState) => unknown) =>
        selector({
          cards: 2,
          unselectAllCards: mockUnselectAllCards,
          allSelectedCards: [1, 2],
          selectCard: mockSelectCard,
          unSelectCard: mockUnSelectCard,
        })
    );
  });

  it('render correct number of selected items', () => {
    (useSearchStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ results: mockResults })
    );

    render(<Flyout />);

    expect(screen.getByText(/2 items are selected/i)).toBeInTheDocument();
  });

  it('unselect all cards', () => {
    (useSearchStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ results: mockResults })
    );

    render(<Flyout />);

    const unselectButton = screen.getByRole('button', {
      name: /Unselect all/i,
    });
    fireEvent.click(unselectButton);

    expect(mockUnselectAllCards).toHaveBeenCalled();
  });

  it('call download function on click', () => {
    (useSearchStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ results: mockResults })
    );

    global.URL.createObjectURL = jest.fn(() => 'blob:http://localhost/fake');

    render(<Flyout />);

    const downloadButton = screen.getByRole('button', { name: /Download/i });
    fireEvent.click(downloadButton);

    expect(URL.createObjectURL).toHaveBeenCalled();
  });
});
