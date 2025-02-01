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

interface AppState {
  searchTerm: string;
  pokemons: Pokemon[];
  currentPage: number;
  totalPages: number;
  throwError: boolean;
}

class App extends Component<object, AppState> {
  state: AppState = {
    searchTerm: '',
    pokemons: [],
    currentPage: 1,
    totalPages: 1,
    throwError: false,
  };

  componentDidMount() {
    this.loadPokemons();
  }

  loadPokemons = async () => {
    const { searchTerm, currentPage } = this.state;
    try {
      const { pokemons, totalPages } = await fetchPokemons(
        searchTerm,
        currentPage
      );
      this.setState({ pokemons, totalPages });
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
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
    const { pokemons, currentPage, totalPages, throwError } = this.state;

    return (
      <div className="app">
        <Header />
        <Search onSearch={this.handleSearch} />
        <ErrorBoundary>
          <CardList pokemons={throwError ? null : pokemons} />
        </ErrorBoundary>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={this.handlePageChange}
        />
        <Footer onErrorClick={this.handleErrorClick} />
      </div>
    );
  }
}

export default App;
