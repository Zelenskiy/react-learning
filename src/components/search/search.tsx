/* eslint-disable react-compiler/react-compiler */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import SearchButton from '../search-button/search-button';
import classes from './search.module.css';

interface SearchProps {
  onSearch: (term: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('searchTerm') || ''
  );

  useEffect(() => {
    onSearch(searchTerm);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = () => {
    localStorage.setItem('searchTerm', searchTerm);
    onSearch(searchTerm);
  };

  return (
    <fieldset className={classes.search}>
      <legend>Top controls</legend>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search Pokémon..."
      />
      <SearchButton onClick={handleSubmit} />
    </fieldset>
  );
};

export default Search;
