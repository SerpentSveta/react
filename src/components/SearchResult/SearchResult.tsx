import './SearchResult.css';
import type { Props } from '../../services/types';
import { useRouter } from 'next/navigation';
import { useContext, useCallback } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { useCardsStore } from '../../store/useCardsStore';
import { useSearchStore } from '../../store/useSearchStore';

export function SearchResult({ page }: Props) {
  const router = useRouter();
  const { isDarkTheme } = useContext(ThemeContext);

  const selectCard = useCardsStore((state) => state.selectCard);
  const unSelectCard = useCardsStore((state) => state.unSelectCard);
  const allSelectedCards = useCardsStore((state) => state.allSelectedCards);

  const results = useSearchStore((state) => state.results);

  const handleNavigate = useCallback(
    (id: number) => {
      router.push(`/page/${page}/${id}`);
    },
    [router, page]
  );

  if (results === null) {
    return null;
  }

  if (results.length === 0) {
    return <p>Nothing was found</p>;
  }

  return (
    <ul className={`result-list`}>
      {results.map((char) => {
        const isChecked: boolean = allSelectedCards.includes(char.id);

        return (
          <li
            className={
              isChecked ? 'result-item result-item--checked' : 'result-item'
            }
            key={char.id}
            onClick={() => handleNavigate(char.id)}
          >
            <img className="char-image" src={char.image} alt={char.name} />
            <button
              className={
                isChecked
                  ? 'checkbox-button checkbox-button--checked'
                  : 'checkbox-button'
              }
              onClick={(e) => {
                e.stopPropagation();
                if (isChecked) {
                  unSelectCard(char.id);
                } else {
                  selectCard(char.id);
                }
              }}
            ></button>
            <span
              className={
                isDarkTheme ? 'char-name char-name--dark' : 'char-name'
              }
            >
              {char.name}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
