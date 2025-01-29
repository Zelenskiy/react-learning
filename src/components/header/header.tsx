import { Component } from 'react';
import { Search } from '../search/search';
import classes from './header.module.css';

export class Header extends Component {
  render() {
    return (
      <header className={classes.header}>
        <Search />
      </header>
    );
  }
}
