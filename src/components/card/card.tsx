import { Component } from 'react';
import classes from './card.module.css';
import { Pokemon } from '../../services/types';

interface CardProps {
  pokemon: Pokemon;
}

class Card extends Component<CardProps> {
  render() {
    const { pokemon } = this.props;
    const pokemonId = pokemon.url.split('/').slice(-2, -1)[0];

    return (
      <div className={classes.card}>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
          alt={pokemon.name}
        />
        <span>
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </span>
      </div>
    );
  }
}

export default Card;
