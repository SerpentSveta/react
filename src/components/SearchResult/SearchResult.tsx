import './SearchResult.css';
import type { Props } from '../../services/types';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { useCardsStore } from '../../store/useCardsStore';

export function SearchResult({ results, page }: Props) {
  const navigate = useNavigate();
  const { detailsId } = useParams();
  const { isDarkTheme } = useContext(ThemeContext);

  const selectCard = useCardsStore((state) => state.selectCard);
  const unSelectCard = useCardsStore((state) => state.unSelectCard);
  const allSelectedCards = useCardsStore((state) => state.allSelectedCards);

  if (results === null) {
    return null;
  }

  if (results.length === 0) {
    return <p>Nothing was found</p>;
  }

  return (
    <ul className={`result-list ${!detailsId ? 'single-column' : ''}`}>
      {results.map((char) => {
        const isChecked: boolean = allSelectedCards.includes(char.id);

        return (
          <li
            className={
              isChecked ? 'result-item result-item--checked' : 'result-item'
            }
            key={char.id}
            onClick={() => navigate(`/page/${page}/${char.id}`)}
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
