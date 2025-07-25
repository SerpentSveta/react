import './Search.css';
import { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
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
  const [quantityPages, setQuantityPages] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { page = '1', detailsId } = useParams();
  const currentPage = Number(page) || 1;
  const navigate = useNavigate();

  useEffect(() => {
    sendRequest();
  }, []);

  useEffect(() => {
    sendRequest();
  }, [charName, page]);

  const sendRequest = async () => {
    if (charName === undefined) return;

    setLoading(true);

    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${charName}&page=${currentPage}`
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
            navigate(`/1`);
          }}
        >
          Search
        </Button>
      </form>
      <h2>Results</h2>
      {error && <p className="error-message">{error}</p>}
      <ErrorBoundary>
        <div className="master-detail">
          {loading ? (
            <Spinner />
          ) : (
            <SearchResult results={results} page={page} />
          )}
          {detailsId && (
            <div className="details-wrapper">
              <Outlet />
            </div>
          )}
        </div>
      </ErrorBoundary>
      <Pagination
        count={quantityPages}
        page={currentPage}
        onChange={(num: number) => navigate(`/${num}`)}
      />
    </section>
  );
}
