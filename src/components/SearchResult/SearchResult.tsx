import './SearchResult.css';
import { Component } from 'react';
import type { Props, ErrorSearchResult } from '../../services/types';
import { Button } from '../Button/Button';

export class SearchResult extends Component<Props> {
  state: ErrorSearchResult = {
    hasError: false,
  };

  sendError = () => {
    this.setState({ hasError: true });
  };

  render() {
    const { results } = this.props;

    if (results === null) {
      return null;
    }

    if (results.length === 0) {
      return <p>Nothing was found</p>;
    }

    if (this.state.hasError) {
      throw new Error('Something broke');
    }

    return (
      <>
        <ul className="result-list">
          {results.map((char) => (
            <li className="result-item" key={char.id}>
              <img className="char-image" src={char.image} alt={char.name} />
              <span className="char-name">{char.name}</span>
            </li>
          ))}
        </ul>
        <Button onClick={this.sendError} style={{ marginTop: '20px' }}>
          Error
        </Button>
      </>
    );
  }
}
