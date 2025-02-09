import React from 'react';
import classes from './card.module.css';
import { Pokemon } from '../../services/types';

interface CardProps {
  pokemon: Pokemon;
  handleClick: (pokemon: Pokemon) => void;
}

const Card: React.FC<CardProps> = ({ pokemon, handleClick }) => {
  return (
    <div className={classes.card}>
      <div className={classes.img}>
        <div
          className={classes.descriptionAll}
          onClick={() => handleClick(pokemon)}
          role="listitem"
        >
          <span className={classes.name}>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
