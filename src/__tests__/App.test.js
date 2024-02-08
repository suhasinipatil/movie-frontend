import { render, screen } from '@testing-library/react';
import App from '../App';

jest.mock('../components/MovieApp', () => {
  return function DummyMovieApp() {
    return <div data-testid="movieapp"></div>;
  };
});

test('renders MovieApp component', () => {
  render(<App />);

  const movieAppElement = screen.getByTestId('movieapp');
  expect(movieAppElement).toBeInTheDocument();
});