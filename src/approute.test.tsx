import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, test, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import AppRoutes from './AppRoutes';

vi.mock('./mainpage/MainPage', () => ({
  default: () => <div>Main Page</div>,
}));

vi.mock('./components/nofound/nofound', () => ({
  default: () => <div>404 Not Found</div>,
}));

describe('AppRoutes', () => {
  test('renders MainPage at root route ("/")', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
