import './SearchResult.css';
import type { Props } from '../../services/types';
import { useNavigate, useParams } from 'react-router-dom';

export function SearchResult({ results, page }: Props) {
  const navigate = useNavigate();
  const { detailsId } = useParams();

  if (results === null) {
    return null;
  }

  if (results.length === 0) {
    return <p>Nothing was found</p>;
  }

  return (
    <>
      <ul className={`result-list ${!detailsId ? 'single-column' : ''}`}>
        {results.map((char) => (
          <li
            className="result-item"
            key={char.id}
            onClick={() => navigate(`/${page}/${char.id}`)}
          >
            <img className="char-image" src={char.image} alt={char.name} />
            <span className="char-name">{char.name}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
