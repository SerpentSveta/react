import { Component } from 'react';
import type { ChangeEvent } from 'react';
import { Button } from '../Button/Button';
import './Search.css';

type SearchState = {
  name: string;
};

export class Search extends Component {
  sendRequest = async () => {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?name=${this.state.name}`
    );
    const data = await response.json();
    console.log(data);
  };

  state: SearchState = {
    name: localStorage.getItem('inputName') || '',
  };

  handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    this.setState({
      name: value,
    });
    localStorage.setItem('inputName', value);
  };
  render() {
    return (
      <section>
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
      </section>
    );
  }
}
