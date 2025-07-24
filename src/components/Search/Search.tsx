import './Search.css';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { ChangeEvent } from 'react';
import { Button } from '../Button/Button';
import type { Character } from '../../services/types';
import { SearchResult } from '../SearchResult/SearchResult';
import { Spinner } from '../Spinner/Spinner';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Pagination } from '../Pagination/Pagination';

export function Search() {
  const [charName, setCharName] = useLocalStorage('inputName', '');
  const [results, setResults] = useState<Character[] | null>(null);
  const [page, setPage] = useState(1);
  const [quantityPages, setQuantityPages] = useState(1);
  const [, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    sendRequest();
  }, []);

  useEffect(() => {
    setSearchParams({ name: charName, page: String(page) });
    sendRequest();
  }, [page]);

  const sendRequest = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${charName}&page=${page}`
      );
      const data = await response.json();

      setResults(data.results || []);
      setQuantityPages(data.info?.pages || 1);
    } catch (error: unknown) {
      console.error('Error receive:', error);
      if (error instanceof Error) {
        setError('Error receive: ' + error.message);
      } else {
        setError('Error receive: unknown error');
      }
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

        <Button
          onClick={() => {
            setPage(1);
            setSearchParams({ name: charName, page: '1' });
            sendRequest();
          }}
        >
          Search
        </Button>
      </form>
      <h2>Results</h2>
      {error && <p className="error-message">{error}</p>}
      <ErrorBoundary>
        {loading ? <Spinner /> : <SearchResult results={results} />}
      </ErrorBoundary>
      <Pagination
        count={quantityPages}
        page={page}
        onChange={(num: number) => setPage(num)}
      />
    </section>
  );
}
