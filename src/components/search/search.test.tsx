import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, beforeEach, expect } from 'vitest';
import Search from './search';

describe('Search component', () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('retrieves the value from local storage on mount', () => {
    localStorage.setItem('searchTerm', JSON.stringify('Pikachu'));

    render(<Search onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search Pokémon...');
    expect(input).toHaveValue('Pikachu');
  });

  it('saves the entered value in local storage when the search button is clicked', () => {
    render(<Search onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search Pokémon...');
    const button = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'bulbasaur' } });
    fireEvent.click(button);

    expect(localStorage.getItem('searchTerm')).toBe(
      JSON.stringify('bulbasaur')
    );
    expect(mockOnSearch).toHaveBeenCalledWith('bulbasaur');
  });
});
