import { Component } from 'react';
import classes from './footer.module.css';

interface FooterProps {
  onErrorClick: () => void;
}

export class Footer extends Component<FooterProps> {
  render() {
    return (
      <footer className={classes.footer}>
        <button
          className={classes.errorButton}
          onClick={this.props.onErrorClick}
        >
          Throw Error
        </button>
      </footer>
    );
  }
}
