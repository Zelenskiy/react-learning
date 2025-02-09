import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect, vi } from 'vitest';
import { Pokemon } from '../../services/types';
import CardList from './cardlist';

vi.mock('../card/card', () => ({
  default: () => <div>Card</div>,
}));

describe('CardList', () => {
  test('renders correct number of cards when pokemons are provided', () => {
    const pokemons: Pokemon[] = [
      {
        name: 'Bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon/1/',
        height: '',
        weight: '',
      },
      {
        name: 'Ivysaur',
        url: 'https://pokeapi.co/api/v2/pokemon/2/',
        height: '',
        weight: '',
      },
    ];

    render(<CardList pokemons={pokemons} />);

    expect(screen.getAllByText('Card')).toHaveLength(pokemons.length);
  });

  test('renders "No Pokémon found" when pokemons is an empty array', () => {
    render(<CardList pokemons={[]} />);
    expect(screen.getByText(/No Pokémon found/)).toBeInTheDocument();
  });

  test('throws error when pokemons is null', () => {
    console.error = vi.fn();
    expect(() => render(<CardList pokemons={null} />)).toThrow(
      'Failed to load Pokémon list'
    );
  });
});
