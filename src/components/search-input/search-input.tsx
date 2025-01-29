import classes from './search-input.module.css';
export function SearchInput() {
  return (
    <input type="text" className={classes.input} placeholder="Search..." />
  );
}
