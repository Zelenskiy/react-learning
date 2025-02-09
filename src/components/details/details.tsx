import React, { Dispatch, SetStateAction } from 'react';
import classes from './details.module.css';
import { Pokemon } from '../../services/types';
import { fetchDescription } from '../../services/getDescription';

interface DetailsProps {
  pokemon: Pokemon | null;
  setPokemon: Dispatch<SetStateAction<Pokemon | null>>;
}

const Details: React.FC<DetailsProps> = ({ pokemon, setPokemon }) => {
  const [description, setDescription] = React.useState<{
    height: string;
    weight: string;
  } | null>(null);

  React.useEffect(() => {
    if (pokemon) {
      const fetchData = async () => {
        const { height, weight } = await fetchDescription(pokemon.name);
        setDescription({ height, weight });
      };
      fetchData();
    }
  }, [pokemon]);

  if (!pokemon) {
    return <div></div>;
  }

  const pokemonId = pokemon.url.split('/').slice(-2, -1)[0];
  function handleClose(): void {
    setPokemon(null);
  }

  return (
    <fieldset className={classes.details}>
      <button className={classes.close} role="button" onClick={handleClose} />
      <legend>Details</legend>
      <h2>{pokemon.name}</h2>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
        alt={pokemon.name}
      />
      {description && (
        <span className={classes.description}>
          <p>Height: {description.height}</p>
          <p>Weight: {description.weight}</p>
        </span>
      )}
    </fieldset>
  );
};

export default Details;
