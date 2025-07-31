import './Flyout.css';
import { Button } from '../Button/Button';
import { useCardsStore } from '../../store/useCardsStore';
import { useSearchStore } from '../../store/useSearchStore';

export function Flyout() {
  const cards = useCardsStore((state) => state.cards);
  const unselectAllCards = useCardsStore((state) => state.unselectAllCards);
  const allSelectedCards = useCardsStore((state) => state.allSelectedCards);

  const results = useSearchStore((state) => state.results);

  const dataToFile =
    results?.filter((card) => allSelectedCards.includes(card.id)) || [];

  const downloadCSV = () => {
    const header = ['Name', 'Status', 'Species', 'Gender'];
    const rows = dataToFile.map((char) => [
      char.name,
      char.status,
      char.species,
      char.gender,
    ]);

    const csvContent = [header, ...rows]
      .map((row) => row.map((value) => `"${value}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv; charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${dataToFile.length}_items.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flyout">
      <p className="flyout-text">{cards} items are selected</p>
      <div className="button-wrapper">
        <Button
          className="flyout-button"
          onClick={() => {
            unselectAllCards();
          }}
        >
          Unselect all
        </Button>
        <Button
          onClick={() => {
            downloadCSV();
          }}
        >
          Download
        </Button>
      </div>
    </div>
  );
}
