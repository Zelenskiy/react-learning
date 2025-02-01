import { Component } from 'react';

import classes from './header.module.css';

export class Header extends Component {
  render() {
    return (
      <header className={classes.header}>
        To search, use: ability, berry, berry-firmness, berry-flavor,
        contest-type, generation, item
      </header>
    );
  }
}
