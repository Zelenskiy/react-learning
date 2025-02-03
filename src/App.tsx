import { Component } from 'react';
import './App.css';
import { Header } from './components/header/header';
import { Pokemon } from './services/types';
import { fetchPokemons } from './services/api';
import Pagination from './components/pagination/pagination';
import CardList from './components/cardlist/cardlist';
import Search from './components/search/search';
import { Footer } from './components/footer/footer';
import ErrorBoundary from './components/errorboundary/errorBoundary';
import Loader from './components/loader/loder';
interface AppState {
  searchTerm: string;
  pokemons: Pokemon[];
  currentPage: number;
  totalPages: number;
  throwError: boolean;
  isLoading: boolean;
}

class App extends Component<object, AppState> {
  state: AppState = {
    searchTerm: '',
    pokemons: [],
    currentPage: 1,
    totalPages: 1,
    throwError: false,
    isLoading: false,
  };

  componentDidMount() {
    this.loadPokemons();
  }

  loadPokemons = async () => {
    const { searchTerm, currentPage } = this.state;
    this.setState({ isLoading: true });
    try {
      const { pokemons, totalPages } = await fetchPokemons(
        searchTerm,
        currentPage
      );
      this.setState({ pokemons, totalPages, isLoading: false });
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
      this.setState({ isLoading: false });
    }
  };

  handleSearch = (term: string) => {
    this.setState({ searchTerm: term, currentPage: 1 }, this.loadPokemons);
  };

  handlePageChange = (page: number) => {
    this.setState({ currentPage: page }, this.loadPokemons);
  };

  handleErrorClick = () => {
    this.setState({ throwError: true });
  };

  render() {
    const { pokemons, currentPage, totalPages, throwError, isLoading } =
      this.state;

    return (
      <div className="app">
        <Header />
        <Search onSearch={this.handleSearch} />
        <fieldset className="results">
          <legend>Results</legend>
          <ErrorBoundary onReset={() => this.setState({ throwError: false })}>
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <CardList pokemons={throwError ? null : pokemons} />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={this.handlePageChange}
                />
              </>
            )}
          </ErrorBoundary>
        </fieldset>

        <Footer onErrorClick={this.handleErrorClick} />
      </div>
    );
  }
}

export default App;
