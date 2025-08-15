'use client';

import '../index.css';
import '../App.css';

import { useState } from 'react';
import { Search } from '../components/Search/Search';
import { ThemeContext } from '../context/ThemeContext';
import { Header } from '../components/Header/Header';

export default function Home() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  return (
    <div className={`${isDarkTheme ? 'app app--dark' : 'app'}`}>
      <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
        <Header />
        <main className={`${isDarkTheme ? 'main main--dark' : 'main'}`}>
          <Search />
        </main>
      </ThemeContext.Provider>
    </div>
  );
}
