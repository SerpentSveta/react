import logo from '/logo.png';
import './Header.css';

export function Header() {
  return (
    <header>
      <img className="header-logo" src={logo} alt="Rick and Morty" />
      <h1>Rick and Morty character search</h1>
    </header>
  );
}
