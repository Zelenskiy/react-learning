/* eslint-disable react-compiler/react-compiler */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import classes from './main.module.css';
import { Pokemon } from '../../services/types';
import { fetchPokemons } from '../../services/api';
import Pagination from '../pagination/pagination';
import CardList from '../cardlist/cardlist';
import Search from '../search/search';
import ErrorBoundary from '../errorboundary/errorBoundary';
import Loader from '../loader/loder';
import Details from '../details/details';

const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [throwError, setThrowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadPokemons();
  }, [searchTerm, currentPage]);

  function handleClick(pokemon: Pokemon): void {
    console.log(pokemon.name);
    setPokemon(pokemon);
  }

  const loadPokemons = async () => {
    setIsLoading(true);
    try {
      const { pokemons, totalPages } = await fetchPokemons(
        searchTerm,
        currentPage
      );
      setPokemons(pokemons);
      setTotalPages(totalPages);
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={classes.app}>
      <Search onSearch={handleSearch} />
      <div className={classes.central}>
        <fieldset className="results">
          <legend>Results</legend>
          <ErrorBoundary onReset={() => setThrowError(false)}>
            {isLoading ? (
              <Loader />
            ) : (
              <div className={classes.central}>
                <aside className={classes.aside}>
                  <CardList
                    pokemons={throwError ? null : pokemons}
                    handleClick={handleClick}
                  />
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </aside>
              </div>
            )}
          </ErrorBoundary>
        </fieldset>
        <Details pokemon={pokemon} />
      </div>
    </div>
  );
};

export default MainPage;
