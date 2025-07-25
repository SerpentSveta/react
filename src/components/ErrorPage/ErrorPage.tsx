import './ErrorPage.css';
import errorPict from '/not-found.jpg';
import { Button } from '../Button/Button';
import { useNavigate } from 'react-router-dom';

export function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="error-page-wrapper">
      <img className="error-img" src={errorPict} alt="Rick and Morty" />
      <p className="error-page-text">
        It looks like nothing was found at this location. Maybe try to search
        for what you are looking for?
      </p>
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
