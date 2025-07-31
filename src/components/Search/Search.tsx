import './Search.css';
import { useState, useEffect, useContext } from 'react';
import type { ChangeEvent } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { Button } from '../Button/Button';
import { SearchResult } from '../SearchResult/SearchResult';
import { Spinner } from '../Spinner/Spinner';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Pagination } from '../Pagination/Pagination';
import { ThemeContext } from '../../context/ThemeContext';
import { Flyout } from '../Flyout/Flyout';
import { useCardsStore } from '../../store/useCardsStore';
import { useSearchStore } from '../../store/useSearchStore';

export function Search() {
  const [charName, setCharName] = useLocalStorage('inputName', '');
  const [quantityPages, setQuantityPages] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { page = '1', detailsId } = useParams();
  const currentPage = Number(page) || 1;
  const navigate = useNavigate();

  const { isDarkTheme } = useContext(ThemeContext);

  const cards = useCardsStore((state) => state.cards);
  const setResults = useSearchStore((state) => state.setResults);

  useEffect(() => {
    sendRequest();
  }, []);

  useEffect(() => {
    sendRequest();
  }, [page]);

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
      <h1 className={isDarkTheme ? 'title-search--dark' : ''}>
        Rick and Morty character search
      </h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={charName}
          onChange={handleNameChange}
          className={
            isDarkTheme ? 'search-input search-input--dark' : 'search-input'
          }
        />

        <Button
          onClick={() => {
            sendRequest();
            navigate(`/page/1`);
          }}
        >
          Search
        </Button>
      </form>
      <h2 className={isDarkTheme ? 'title-search--dark' : ''}>Results</h2>
      {error && <p className="error-message">{error}</p>}
      <ErrorBoundary>
        <div className="master-detail">
          {loading ? <Spinner /> : <SearchResult page={page} />}
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
        onChange={(num: number) => navigate(`/page/${num}`)}
      />
      {cards > 0 && <Flyout />}
    </section>
  );
}
