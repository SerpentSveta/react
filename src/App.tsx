import './App.css';
import { Header } from './components/Header/Header';
import { Search } from './components/Search/Search';
import { About } from './components/About/About';
import { Navigate, Routes, Route } from 'react-router';
import { ErrorPage } from './components/ErrorPage/ErrorPage';
import { CharacterDetails } from './components/CharacterDetails/CharacterDetails';
import { useState } from 'react';
import { ThemeContext } from './context/ThemeContext';

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  return (
    <div className={`${isDarkTheme ? 'app app--dark' : 'app'}`}>
      <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
        <Header />
        <main className={`${isDarkTheme ? 'main main--dark' : 'main'}`}>
          <Routes>
            <Route path="/" element={<Navigate to="/page/1" />} />
            <Route path="/page/:page" element={<Search />}>
              <Route path=":detailsId" element={<CharacterDetails />} />
            </Route>
            <Route path="/about" element={<About />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
