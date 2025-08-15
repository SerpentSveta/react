'use client';

import './Header.css';
import Link from 'next/link';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import Image from 'next/image';

export function Header() {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

  return (
    <header>
      <Link href="/">
        <Image
          className="header-logo"
          src={isDarkTheme ? '/logo-dark.jpg' : '/logo.png'}
          width={163}
          height={55}
          alt="Rick and Morty"
        />
      </Link>
      <div className="navigation">
        <Link
          href="about"
          className={
            isDarkTheme ? 'header-link header-link--dark' : 'header-link'
          }
        >
          About
        </Link>
        <button className="header__button" onClick={toggleTheme}>
          <Image
            className="theme-icon"
            src={isDarkTheme ? '/sun-yello.svg' : '/moon.svg'}
            width={14}
            height={18}
            alt={isDarkTheme ? 'Light theme' : 'Dark theme'}
          />
        </button>
      </div>
    </header>
  );
}
