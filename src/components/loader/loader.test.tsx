import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loader from './loder';

describe('Loader Component', () => {
  it('renders loader with correct class and contains an SVG', () => {
    render(<Loader />);

    const loaderElement = screen.getByRole('img');
    expect(loaderElement).toBeInTheDocument();
  });
});
