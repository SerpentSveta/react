import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import type { CardsState } from '../services/types';

export const useCardsStore = create<CardsState>()(
  devtools(
    persist(
      (set) => ({
        cards: 0,
        allSelectedCards: [],
        selectCard: (id) =>
          set((state) => ({
            cards: state.cards + 1,
            allSelectedCards: [...state.allSelectedCards, id],
          })),
        unSelectCard: (id) =>
          set((state) => ({
            cards: state.cards - 1,
            allSelectedCards: state.allSelectedCards.filter(
              (currentId) => currentId !== id
            ),
          })),
        unselectAllCards: () => set({ cards: 0, allSelectedCards: [] }),
      }),
      { name: 'cards-storage' }
    )
  )
);
