import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders app logo', async () => {
  render(<App />);
  const logoElement = await screen.findByAltText(/Movie App/i);
  expect(logoElement).toBeInTheDocument();
});