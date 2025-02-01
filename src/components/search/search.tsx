import React, { Component } from 'react';
import SearchButton from '../search-button/search-button';
import classes from './search.module.css';

interface SearchProps {
  onSearch: (term: string) => void;
}

interface SearchState {
  searchTerm: string;
}

class Search extends Component<SearchProps, SearchState> {
  state: SearchState = {
    searchTerm: localStorage.getItem('searchTerm') || '',
  };

  componentDidMount() {
    this.props.onSearch(this.state.searchTerm);
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSubmit = () => {
    const { searchTerm } = this.state;
    localStorage.setItem('searchTerm', searchTerm);
    this.props.onSearch(searchTerm);
  };

  render() {
    return (
      <div className={classes.search}>
        <input
          type="text"
          value={this.state.searchTerm}
          onChange={this.handleChange}
          placeholder="Search Pokémon..."
        />
        <SearchButton onClick={this.handleSubmit} />
      </div>
    );
  }
}

export default Search;
