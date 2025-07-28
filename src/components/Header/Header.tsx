import logo from '/logo.png';
import sun from '/sun.svg';
import moon from '/moon.svg';

import './Header.css';
import { Link } from 'react-router';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

export function Header() {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

  return (
    <header>
      <Link to="/">
        <img className="header-logo" src={logo} alt="Rick and Morty" />
      </Link>
      <div className="navigation">
        <Link to="/about" className="header-link">
          About
        </Link>
        <button className="header__button" onClick={toggleTheme}>
          <img
            src={isDarkTheme ? sun : moon}
            alt={isDarkTheme ? 'Light theme' : 'Dark theme'}
            className="theme-icon"
          />
        </button>
      </div>
    </header>
  );
}
