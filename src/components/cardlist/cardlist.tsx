import { Component } from 'react';
import Card from '../card/card';
import { Pokemon } from '../../services/types';
import classes from './cardlist.module.css';

interface CardListProps {
  pokemons: Pokemon[] | null;
}

class CardList extends Component<CardListProps> {
  render() {
    const { pokemons } = this.props;

    if (!pokemons) {
      throw new Error('Failed to load Pokémon list');
    }

    return (
      <div className={classes.main}>
        {pokemons.length > 0 ? (
          pokemons.map((pokemon) => (
            <Card key={pokemon.name} pokemon={pokemon} />
          ))
        ) : (
          <p>No Pokémon found.</p>
        )}
      </div>
    );
  }
}

export default CardList;
