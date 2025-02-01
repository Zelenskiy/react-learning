import { Pokemon } from './types';

interface ApiResponse {
  results: Pokemon[];
  count: number;
}

export const fetchPokemons = async (
  searchTerm: string,
  currentPage: number
): Promise<{ pokemons: Pokemon[]; totalPages: number }> => {
  const limit = 10;
  const offset = (currentPage - 1) * limit;
  const baseUrl = 'https://pokeapi.co/api/v2/pokemon?limit=2000';

  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data: ApiResponse = await response.json();

    let filteredPokemons = data.results;

    if (searchTerm.trim()) {
      filteredPokemons = filteredPokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const totalPages = Math.ceil(filteredPokemons.length / limit);
    const paginatedPokemons = filteredPokemons.slice(offset, offset + limit);

    return { pokemons: paginatedPokemons, totalPages };
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    return { pokemons: [], totalPages: 1 };
  }
};
