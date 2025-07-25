import './About.css';
import { useNavigate } from 'react-router-dom';
import rssLogo from '/rss-logo.png';
import { Button } from '../Button/Button';

export function About() {
  const navigate = useNavigate();

  return (
    <div className="about-wrapper">
      <div className="about-description">
        <h2 className="about-title">Svetlana Aleksandrova</h2>
        <p className="about-position">Developer, Designer</p>
        <p className="about-text">
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
