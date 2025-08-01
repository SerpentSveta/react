import { act } from 'react-dom/test-utils';
import { useCardsStore } from '../store/useCardsStore';

describe('useCardsStore', () => {
  beforeEach(() => {
    useCardsStore.setState({ cards: 0, allSelectedCards: [] });
  });

  it('select the card and add it to the array', () => {
    act(() => {
      useCardsStore.getState().selectCard(5);
    });

    const { cards, allSelectedCards } = useCardsStore.getState();

    expect(cards).toBe(1);
    expect(allSelectedCards).toEqual([5]);
  });

  it('select the cards and remove the selection from the card', () => {
    act(() => {
      useCardsStore.getState().selectCard(1);
      useCardsStore.getState().selectCard(2);
      useCardsStore.getState().unSelectCard(1);
    });

    const { cards, allSelectedCards } = useCardsStore.getState();

    expect(cards).toBe(1);
    expect(allSelectedCards).toEqual([2]);
  });

  it('remove the selection from the all cards', () => {
    act(() => {
      useCardsStore.getState().selectCard(1);
      useCardsStore.getState().selectCard(2);
      useCardsStore.getState().unselectAllCards();
    });

    const { cards, allSelectedCards } = useCardsStore.getState();

    expect(cards).toBe(0);
    expect(allSelectedCards).toEqual([]);
  });
});
