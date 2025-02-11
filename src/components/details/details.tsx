import React, { Dispatch, SetStateAction, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import classes from './details.module.css';
import { Pokemon } from '../../services/types';
import { fetchDescription } from '../../services/getDescription';
import Loader from '../loader/loder';
import { fetchPokemonByName } from '../../services/api';

interface DetailsProps {
  pokemon: Pokemon | null;
  setPokemon: Dispatch<SetStateAction<Pokemon | null>>;
}

const Details: React.FC<DetailsProps> = ({ pokemon, setPokemon }) => {
  const [description, setDescription] = React.useState<{
    height: string;
    weight: string;
  } | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (pokemon) {
      const fetchData = async () => {
        setIsLoading(true);
        const { height, weight } = await fetchDescription(pokemon.name);
        setDescription({ height, weight });
        setIsLoading(false);
      };
      fetchData();
      navigate(`${location.pathname}?details=${pokemon.name}`);
    }
  }, [pokemon, history, location.pathname]);

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const details = params.get('details');
    if (details && !pokemon) {
      // Fetch the pokemon details based on the name in the URL
      // Assuming you have a function to fetch pokemon by name
      fetchPokemonByName(details).then(setPokemon);
    }
  }, [location.search, pokemon, setPokemon]);

  if (!pokemon) {
    return <div></div>;
  }

  const pokemonId = pokemon.url.split('/').slice(-2, -1)[0];
  function handleClose(): void {
    setPokemon(null);
    console.log(location.pathname);
    navigate(location.pathname);
  }

  return (
    <fieldset className={classes.details}>
      <button className={classes.close} role="button" onClick={handleClose} />
      <legend>Details</legend>
      {isLoading ? (
        <Loader />
      ) : (
        <>
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
        </>
      )}
    </fieldset>
  );
};

export default Details;
