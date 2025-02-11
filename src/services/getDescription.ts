interface ApiResponse {
  weight: string;
  height: string;
}

export const fetchDescription = async (
  namePokemon: string
): Promise<{ weight: string; height: string }> => {
  const baseUrl = `https://pokeapi.co/api/v2/pokemon/${namePokemon}`;

  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data: ApiResponse = await response.json();
    let height = '0';
    let weight = '0';
    if (data) {
      height = data.height;
      weight = data.weight;
    }

    return { height, weight };
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    return { height: '0', weight: '0' };
  }
};
