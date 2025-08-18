'use client';

import { useState, useEffect, useContext } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import { Button } from '../Button/Button';
import { SearchResult } from '../SearchResult/SearchResult';
import { Spinner } from '../Spinner/Spinner';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import { Flyout } from '../Flyout/Flyout';
import { Pagination } from '../Pagination/Pagination';
import { RefreshButton } from '../RefreshButton/RefreshButton';
import { CharacterDetails } from '../CharacterDetails/CharacterDetails';

import { ThemeContext } from '../../context/ThemeContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useCardsStore } from '../../store/useCardsStore';
import { useSearchStore } from '../../store/useSearchStore';
import { useCharactersQuery } from '../../query/useCharactersQuery';

export function SearchContent() {
  const [charName, setCharName] = useLocalStorage('inputName', '');
  const [inputValue, setInputValue] = useState(charName || '');
  const [quantityPages, setQuantityPages] = useState(1);

  const searchParams = useSearchParams();
  const router = useRouter();

  const detailsId = searchParams.get('detailsId');
  const pageParam = searchParams.get('page');
  const currentPage = pageParam ? Number(pageParam) : 1;

  const { isDarkTheme } = useContext(ThemeContext);

  const cards = useCardsStore((state) => state.cards);
  const setResults = useSearchStore((state) => state.setResults);

  const { data, error, isPending } = useCharactersQuery(charName, currentPage);

  useEffect(() => {
    if (data?.results) setResults(data.results);
    if (data?.info?.pages) setQuantityPages(data.info.pages);
  }, [data]);

  useEffect(() => {
    setInputValue(charName);
  }, [charName]);

  if (isPending) {
    return <Spinner />;
  }

  if (error)
    return (
      <div className="error-message">
        An error has occurred: {error.message}
      </div>
    );

  function goToPage(num: number) {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(num));
    router.push(`?${params.toString()}`);
    setCharName(inputValue);
  }

  return (
    <section className="section-search">
      <h1 className={isDarkTheme ? 'title-search--dark' : ''}>
        Rick and Morty character search
      </h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={
            isDarkTheme ? 'search-input search-input--dark' : 'search-input'
          }
        />
        <Button onClick={() => goToPage(1)}>Search</Button>
      </form>
      <h2 className={isDarkTheme ? 'title-search--dark' : ''}>Results</h2>
      {error && <p className="error-message">{error}</p>}
      <ErrorBoundary>
        <div className="master-detail">
          <SearchResult page={currentPage} />

          {detailsId && (
            <CharacterDetails
              detailsId={detailsId}
              onClose={() => {
                const params = new URLSearchParams(searchParams);
                params.delete('detailsId');
                router.push(`?${params.toString()}`);
              }}
            />
          )}
        </div>
      </ErrorBoundary>
      <Pagination
        count={quantityPages}
        page={currentPage}
        onChange={(num: number) => goToPage(num)}
      />
      {cards > 0 && <Flyout />}
      <RefreshButton />
    </section>
  );
}
