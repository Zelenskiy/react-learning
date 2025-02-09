import { useState, useEffect } from 'react';
import classes from './main.module.css';
import { Pokemon } from '../../services/types';
import { fetchPokemons } from '../../services/api';
import Search from '../search/search';
import ErrorBoundary from '../errorboundary/errorBoundary';
import Loader from '../loader/loder';
import CardList from '../cardlist/cardlist';
import Pagination from '../pagination/pagination';
import Details from '../details/details';

const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [throwError, setThrowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const page = queryParams.get('page');
    const search = queryParams.get('search');

    if (page) setCurrentPage(Number(page));
    if (search) setSearchTerm(search);
  }, []);

  useEffect(() => {
    updateUrlParams();
    loadPokemons();
  }, [searchTerm, currentPage]);

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

  const updateUrlParams = () => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('page', currentPage.toString());
    if (searchTerm) {
      queryParams.set('search', searchTerm);
    } else {
      queryParams.delete('search');
    }
    window.history.replaceState(null, '', `?${queryParams.toString()}`);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  function handleClick(pokemon: Pokemon): void {
    console.log(pokemon.name);
    setPokemon(pokemon);
  }

  return (
    <div className={classes.app}>
      <div className={classes.central}>
        <aside>
          <Search onSearch={handleSearch} />
          <fieldset className={classes.resuls}>
            <legend>Results</legend>
            <ErrorBoundary onReset={() => setThrowError(false)}>
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  <CardList
                    pokemons={throwError ? null : pokemons}
                    handleClick={handleClick}
                  />
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </>
              )}
            </ErrorBoundary>
          </fieldset>
        </aside>
        <Details pokemon={pokemon} setPokemon={setPokemon} />
      </div>
    </div>
  );
};

export default MainPage;
