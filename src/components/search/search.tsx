import React, { useEffect } from 'react';
import SearchButton from '../search-button/search-button';
import classes from './search.module.css';
import useLocalStorage from '../../hooks/useLocalStorage';

interface SearchProps {
  onSearch: (term: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');

  useEffect(() => {
    onSearch(searchTerm);
  }, [searchTerm, onSearch]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = () => {
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
