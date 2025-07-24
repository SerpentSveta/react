import logo from '/logo.png';
import './Header.css';
import { Link } from 'react-router';

export function Header() {
  return (
    <header>
      <img className="header-logo" src={logo} alt="Rick and Morty" />
      <Link to="/about">About</Link>
      <h1>Rick and Morty character search</h1>
    </header>
  );
}
