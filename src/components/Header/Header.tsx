import logo from '/logo.png';
import logoDark from '/logo-dark.jpg';
import sun from '/sun-yello.svg';
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
        <img
          className="header-logo"
          src={isDarkTheme ? logoDark : logo}
          alt="Rick and Morty"
        />
      </Link>
      <div className="navigation">
        <Link
          to="/about"
          className={
            isDarkTheme ? 'header-link header-link--dark' : 'header-link'
          }
        >
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
