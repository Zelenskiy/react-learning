import { Component } from 'react';
import classes from './search-button.module.css';

export class SearchButton extends Component {
  render() {
    return <button className={classes.button}>Search</button>;
  }
}
