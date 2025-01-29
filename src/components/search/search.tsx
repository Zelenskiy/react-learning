import { Component } from 'react';
import { SearchButton } from '../search-button/search-button';
import { SearchInput } from '../search-input/search-input';
import classes from './search.module.css';

export class Search extends Component {
  render() {
    return (
      <div className={classes.search}>
        <SearchInput />
        <SearchButton />
      </div>
    );
  }
}
