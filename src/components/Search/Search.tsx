import './Search.css';
import { Component } from 'react';
import type { ChangeEvent } from 'react';
import { Button } from '../Button/Button';
import type { SearchState } from '../../services/types';
import { SearchResult } from '../SearchResult/SearchResult';
import { Spinner } from '../Spinner/Spinner';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';

export class Search extends Component {
  state: SearchState = {
    name: localStorage.getItem('inputName') || '',
    results: null,
    loading: false,
    error: null,
  };

  componentDidMount() {
    if (this.state.name.trim() !== '') {
      this.sendRequest();
    }
  }

  handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    this.setState({
      name: value,
    });

    localStorage.setItem('inputName', value);
  };

  sendRequest = async () => {
    this.setState({ loading: true });
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${this.state.name}&page=1`
      );
      const data = await response.json();

      if (process.env.NODE_ENV !== 'test') {
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }

      this.setState({ results: data.results || [] });
    } catch (error) {
      console.error('Error receive:', error);
      this.setState({
        results: [],
        error: 'Error receive: ' + (error as Error).message,
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <section className="section-search">
        <h2>Search</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleNameChange}
            className="search-input"
          />

          <Button onClick={this.sendRequest}>Search</Button>
        </form>
        <h2>Results</h2>
        {this.state.error && (
          <p className="error-message">{this.state.error}</p>
        )}

        <ErrorBoundary>
          {this.state.loading ? (
            <Spinner />
          ) : (
            <SearchResult results={this.state.results} />
          )}
        </ErrorBoundary>
      </section>
    );
  }
}
