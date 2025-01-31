import { Pokemon } from './types';

interface ApiResponse {
  results: { name: string; url: string }[];
  count: number;
}

export const fetchPokemons = async (
  searchTerm: string,
  currentPage: number
): Promise<{ pokemons: Pokemon[]; totalPages: number }> => {
  const limit = 4;
  const offset = (currentPage - 1) * limit;
  const url = searchTerm
    ? `https://pokeapi.co/api/v2/pokemon/${searchTerm}`
    : `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data: ApiResponse | Pokemon = await response.json();

    if (searchTerm) {
      return {
        pokemons: [
          { name: (data as Pokemon).name, url: (data as Pokemon).url },
        ],
        totalPages: 1,
      };
    }

    return {
      pokemons: (data as ApiResponse).results,
      totalPages: Math.ceil((data as ApiResponse).count / limit),
    };
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    return { pokemons: [], totalPages: 1 };
  }
};
