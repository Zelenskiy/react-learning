import { Component } from 'react';
import classes from './footer.module.css';

export class Footer extends Component {
  render() {
    return (
      <footer className={classes.footer}>
        <p>My Footer</p>
      </footer>
    );
  }
}
