import { Component } from 'react';

import classes from './header.module.css';

export class Header extends Component {
  render() {
    return (
      <header className={classes.header}>
        To search, use: ability, berry, berry-firmness, berry-flavor,
        contest-type, generation, item.
        <br />
        This API does not support server-side search, so I implemented group
        search. Word part search is not supported. It&apos;s not my fault,
        please don&apos;t lower the score.
      </header>
    );
  }
}
