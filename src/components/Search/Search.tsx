import './Search.css';
import { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { Button } from '../Button/Button';
import type { Character } from '../../services/types';
import { SearchResult } from '../SearchResult/SearchResult';
import { Spinner } from '../Spinner/Spinner';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export function Search() {
  const [charName, setCharName] = useLocalStorage('inputName', '');
  const [results, setResults] = useState<Character[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    sendRequest();
  }, []);

  const sendRequest = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${charName}&page=1`
      );
      const data = await response.json();

      if (process.env.NODE_ENV !== 'test') {
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }

      setResults(data.results || []);
    } catch (error) {
      console.error('Error receive:', error);
      setResults([]);
      setError('Error receive: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.trim();
    setCharName(value);
  }

  return (
    <section className="section-search">
      <h2>Search</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={charName}
          onChange={handleNameChange}
          className="search-input"
        />

        <Button onClick={sendRequest}>Search</Button>
      </form>
      <h2>Results</h2>
      {error && <p className="error-message">{error}</p>}
      <ErrorBoundary>
        {loading ? <Spinner /> : <SearchResult results={results} />}
      </ErrorBoundary>
    </section>
  );
}
