/* eslint-disable react-compiler/react-compiler */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import './App.css';
import { Pokemon } from './services/types';
import { fetchPokemons } from './services/api';
import Pagination from './components/pagination/pagination';
import CardList from './components/cardlist/cardlist';
import Search from './components/search/search';
import ErrorBoundary from './components/errorboundary/errorBoundary';
import Loader from './components/loader/loder';
import Footer from './components/footer/footer';
import Header from './components/header/header';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [throwError, setThrowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
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

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleErrorClick = () => {
    setThrowError(true);
  };

  return (
    <div className="app">
      <Header />
      <Search onSearch={handleSearch} />
      <fieldset className="results">
        <legend>Results</legend>
        <ErrorBoundary onReset={() => setThrowError(false)}>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <CardList pokemons={throwError ? null : pokemons} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </ErrorBoundary>
      </fieldset>
      <Footer onErrorClick={handleErrorClick} />
    </div>
  );
};

export default App;
