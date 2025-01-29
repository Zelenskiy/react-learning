import { Search } from '../search/search';
import classes from './header.module.css';
export function Header() {
  return (
    <header className={classes.header}>
      <Search />
    </header>
  );
}
