import './SearchResult.css';
import type { Props } from '../../services/types';

export function SearchResult({ results }: Props) {
  if (results === null) {
    return null;
  }

  if (results.length === 0) {
    return <p>Nothing was found</p>;
  }

  return (
    <>
      <ul className="result-list">
        {results.map((char) => (
          <li className="result-item" key={char.id}>
            <img className="char-image" src={char.image} alt={char.name} />
            <span className="char-name">{char.name}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
