import React from 'react';
import classes from './card.module.css';
import { Pokemon } from '../../services/types';

interface CardProps {
  pokemon: Pokemon;
}

const Card: React.FC<CardProps> = ({ pokemon }) => {
  const pokemonId = pokemon.url.split('/').slice(-2, -1)[0];

  return (
    <div className={classes.card} title="use scroll">
      <div className={classes.img}>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
          alt={pokemon.name}
        />
      </div>
      <div className={classes.descriptionAll}>
        <span className={classes.name}>
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </span>
        <span className={classes.description}>
          Height: {pokemon.height}, Weight: {pokemon.weight}
        </span>
      </div>
    </div>
  );
};

export default Card;
