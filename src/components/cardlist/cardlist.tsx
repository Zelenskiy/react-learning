import { Component } from 'react';
import Card from '../card/card';
import { Pokemon } from '../../services/types';
import classes from './cardlist.module.css';

interface CardListProps {
  pokemons: Pokemon[];
}

class CardList extends Component<CardListProps> {
  render() {
    const { pokemons } = this.props;
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
