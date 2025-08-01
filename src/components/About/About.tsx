import './About.css';
import { useNavigate } from 'react-router-dom';
import rssLogo from '/rss-logo.png';
import { Button } from '../Button/Button';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

export function About() {
  const navigate = useNavigate();
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <div className="about-wrapper">
      <div className="about-description">
        <h2
          className={`${isDarkTheme ? 'about-title about-title--dark' : 'about-title'}`}
        >
          Svetlana Aleksandrova
        </h2>
        <p
          className={`${isDarkTheme ? 'about-position about-position--dark' : 'about-position'}`}
        >
          Developer, Designer
        </p>
        <p
          className={`${isDarkTheme ? 'about-text about-text--dark' : 'about-text'}`}
        >
          My name is Svetlana, I&apos;m from Shchelkovo, Russia. I used to work
          in the advertising department of a tour operator, where I was
          responsible for catalog layout design and also helped maintain the
          website. Now I&apos;ve decided to learn how to create websites myself,
          instead of just editing and filling them with content.
        </p>
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="logo-school" src={rssLogo} alt="RS School" />
        </a>
      </div>

      <Button
        onClick={() => {
          navigate('/');
        }}
      >
        Home
      </Button>
    </div>
  );
}
