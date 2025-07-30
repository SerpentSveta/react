import { useCardsStore } from '../../store/useCardsStore';
import { Button } from '../Button/Button';

export function Flyout() {
  const cards = useCardsStore((state) => state.cards);
  const unselectAllCards = useCardsStore((state) => state.unselectAllCards);

  return (
    <div className="flyout">
      <p>{cards} items are selected</p>
      <div className="button-wrapper">
        <Button
          onClick={() => {
            unselectAllCards();
          }}
        >
          Unselect all
        </Button>
        <Button
          onClick={() => {
            unselectAllCards();
          }}
        >
          Download
        </Button>
      </div>
    </div>
  );
}
