import './CharacterDetails.css';
import type { CharacterDetails } from '../../services/types';
import type { CharacterDetailsProps } from '../../services/types';
import { Button } from '../Button/Button';
import { Spinner } from '../Spinner/Spinner';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { useCharactersDetailsQuery } from '../../query/useCharactersQuery';

export function CharacterDetails({
  detailsId,
  onClose,
}: CharacterDetailsProps) {
  const { isDarkTheme } = useContext(ThemeContext);

  const {
    data: charDetails,
    error,
    isPending,
  } = useCharactersDetailsQuery(detailsId);

  if (isPending) {
    return <Spinner />;
  }

  if (error)
    return (
      <div className="error-message">
        An error has occurred: {error.message}
      </div>
    );

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
        <Button onClick={onClose}>Close</Button>
      </div>
    </>
  );
}
