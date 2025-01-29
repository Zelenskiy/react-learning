import { SearchButton } from '../search-button/search-button';
import { SearchInput } from '../search-input/search-input';
import classes from './search.module.css';

export function Search() {
  return (
    <div className={classes.search}>
      <SearchInput />
      <SearchButton />
    </div>
  );
}
