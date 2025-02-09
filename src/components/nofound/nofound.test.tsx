import { render, screen } from '@testing-library/react';
import NoFound from './nofound';
import '@testing-library/jest-dom';

describe('NoFound Component', () => {
  test('renders 404 and Page no found text', () => {
    render(<NoFound />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page no found')).toBeInTheDocument();
  });
});
