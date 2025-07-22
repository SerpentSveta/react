import './SearchResult.css';
import type { Props } from '../../services/types';
import { Button } from '../Button/Button';
import { useState } from 'react';

export function SearchResult({ results }: Props) {
  const [hasError, setHasError] = useState<boolean>(false);

  const sendError = () => {
    setHasError(true);
  };

  if (results === null) {
    return null;
  }

  if (results.length === 0) {
    return <p>Nothing was found</p>;
  }

  if (hasError) {
    throw new Error('Something broke');
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
      <Button onClick={sendError} style={{ marginTop: '20px' }}>
        Error
      </Button>
    </>
  );
}
