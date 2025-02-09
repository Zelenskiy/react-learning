import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { vi, Mock } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
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

  const renderWithRouter = (component: JSX.Element) => {
    return render(<MemoryRouter>{component}</MemoryRouter>);
  };

  it('renders loading indicator while fetching data', async () => {
    (fetchDescription as Mock).mockImplementation(() => new Promise(() => {}));

    renderWithRouter(
      <Details pokemon={mockPokemon} setPokemon={mockSetPokemon} />
    );

    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('loader')).toBeInTheDocument();
  });

  it('renders Pokémon details correctly', async () => {
    (fetchDescription as Mock).mockResolvedValue({
      height: '4',
      weight: '60',
    });

    renderWithRouter(
      <Details pokemon={mockPokemon} setPokemon={mockSetPokemon} />
    );

    expect(screen.getByRole('loader')).toBeInTheDocument();

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

    renderWithRouter(
      <Details pokemon={mockPokemon} setPokemon={mockSetPokemon} />
    );

    const closeButton = screen.getByRole('button');

    await act(async () => {
      fireEvent.click(closeButton);
    });

    expect(mockSetPokemon).toHaveBeenCalledWith(null);
  });
});
