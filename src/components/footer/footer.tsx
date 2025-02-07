import React from 'react';
import classes from './footer.module.css';

interface FooterProps {
  onErrorClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onErrorClick }) => {
  return (
    <footer className={classes.footer}>
      <button className={classes.errorButton} onClick={onErrorClick}>
        Throw Error
      </button>
    </footer>
  );
};

export default Footer;
