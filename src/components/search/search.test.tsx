import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Search from './search';
import '@testing-library/jest-dom';

describe('Search Component', () => {
  it('renders input and button', () => {
    render(<Search onSearch={() => {}} />);
    expect(
      screen.getByPlaceholderText('Search Pokémon...')
    ).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('updates input value on change', () => {
    render(<Search onSearch={() => {}} />);
    const input = screen.getByPlaceholderText(
      'Search Pokémon...'
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Pikachu' } });
    expect(input.value).toBe('Pikachu');
  });

  it('calls onSearch with the correct term on button click', () => {
    const mockOnSearch = vi.fn();
    render(<Search onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(
      'Search Pokémon...'
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Charmander' } });

    fireEvent.click(screen.getByRole('button'));
    expect(mockOnSearch).toHaveBeenCalledWith('Charmander');
  });
});
