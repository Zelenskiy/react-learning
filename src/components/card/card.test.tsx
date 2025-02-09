import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import Card from './card';
import { Pokemon } from '../../services/types';

describe('Card Component', () => {
  const mockPokemon: Pokemon = {
    name: 'pikachu',
    url: 'https://pokeapi.co/api/v2/pokemon/25',
    height: '',
    weight: '',
  };

  it('renders the Pokémon name', () => {
    render(<Card pokemon={mockPokemon} handleClick={() => {}} />);

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });

  it('calls handleClick when the card is clicked', () => {
    const handleClickMock = vi.fn();
    render(<Card pokemon={mockPokemon} handleClick={handleClickMock} />);

    fireEvent.click(screen.getByRole('listitem')); // Click on the card

    expect(handleClickMock).toHaveBeenCalledWith(mockPokemon);
  });

  it('calls handleClick only once when clicked', () => {
    const handleClickMock = vi.fn();
    render(<Card pokemon={mockPokemon} handleClick={handleClickMock} />);

    fireEvent.click(screen.getByRole('listitem'));

    expect(handleClickMock).toHaveBeenCalledTimes(1);
  });
});
