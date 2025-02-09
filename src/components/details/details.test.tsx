import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, Mock } from 'vitest';
import { Pokemon } from '../../services/types';
import { fetchDescription } from '../../services/getDescription';
import Details from './details';
import '@testing-library/jest-dom';

vi.mock('../../services/getDescription', () => ({
  fetchDescription: vi.fn(),
}));

describe('Details component', () => {
  const mockSetPokemon = vi.fn();
  const mockPokemon: Pokemon = {
    name: 'pikachu',
    url: 'https://pokeapi.co/api/v2/pokemon/25/',
    height: '',
    weight: '',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading indicator while fetching data', async () => {
    (fetchDescription as Mock).mockImplementation(() => new Promise(() => {}));

    render(<Details pokemon={mockPokemon} setPokemon={mockSetPokemon} />);

    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders Pokémon details correctly', async () => {
    (fetchDescription as Mock).mockResolvedValue({
      height: '4',
      weight: '60',
    });

    render(<Details pokemon={mockPokemon} setPokemon={mockSetPokemon} />);

    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
      expect(screen.getByText('Height: 4')).toBeInTheDocument();
      expect(screen.getByText('Weight: 60')).toBeInTheDocument();
    });
  });

  it('hides component when close button is clicked', async () => {
    (fetchDescription as Mock).mockResolvedValue({
      height: '4',
      weight: '60',
    });

    render(<Details pokemon={mockPokemon} setPokemon={mockSetPokemon} />);

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    expect(mockSetPokemon).toHaveBeenCalledWith(null);
  });
});
