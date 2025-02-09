import React from 'react';
import classes from './details.module.css';
import { Pokemon } from '../../services/types';

interface DetailsProps {
  pokemon: Pokemon | null;
}

const Details: React.FC<DetailsProps> = ({ pokemon }) => {
  if (!pokemon) {
    return <div></div>;
  } else {
    const pokemonId = pokemon.url.split('/').slice(-2, -1)[0];
    return (
      <fieldset className={classes.details}>
        <legend>Details</legend>
        <h2>{pokemon.name}</h2>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
          alt={pokemon.name}
        />
        <span className={classes.description}>
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
        </span>
      </fieldset>
    );
  }
};

export default Details;
