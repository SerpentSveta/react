import logo from '/logo.png';
import './Header.css';
import { Link } from 'react-router';

export function Header() {
  return (
    <header>
      <Link to="/">
        <img className="header-logo" src={logo} alt="Rick and Morty" />
      </Link>
      <Link to="/about" className="header-link">
        About
      </Link>
      <h1>Rick and Morty character search</h1>
    </header>
  );
}
