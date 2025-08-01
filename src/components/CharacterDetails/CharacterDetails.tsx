import './CharacterDetails.css';
import { useNavigate, useParams } from 'react-router-dom';
import type { CharacterDetails } from '../../services/types';
import { useState, useEffect } from 'react';
import { Button } from '../Button/Button';
import { Spinner } from '../Spinner/Spinner';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

export function CharacterDetails() {
  const { detailsId, page } = useParams();
  const [charDetails, setCharDetails] = useState<CharacterDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { isDarkTheme } = useContext(ThemeContext);

  useEffect(() => {
    sendRequest();
  }, [detailsId]);

  const sendRequest = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/${detailsId}`
      );
      const data = await response.json();
      setCharDetails(data);
    } catch (error) {
      if (error instanceof Error) {
        setError('Error receive: ' + error.message);
      } else {
        setError('Unknown error');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (charDetails === null) {
    return <p>Nothing was found</p>;
  }

  return (
    <>
      <div className="char-details-wrapper">
        {error && <p className="error-message">{error}</p>}
        <img
          className="char-details-image"
          src={charDetails.image}
          alt={charDetails.name}
        />
        <p
          className={
            isDarkTheme ? 'char-details-name--dark' : 'char-details-name'
          }
        >
          {charDetails.name}
        </p>
        <p
          className={
            isDarkTheme ? 'char-details-status--dark' : 'char-details-status'
          }
        >
          Status: {charDetails.status}
        </p>
        <p
          className={
            isDarkTheme ? 'char-details-species--dark' : 'char-details-species'
          }
        >
          Species: {charDetails.species}
        </p>
        <p
          className={
            isDarkTheme ? 'char-details-gender--dark' : 'char-details-gender'
          }
        >
          Gender: {charDetails.gender}
        </p>
        <Button
          onClick={() => {
            navigate(`/page/${page}`);
          }}
        >
          Close
        </Button>
      </div>
    </>
  );
}
