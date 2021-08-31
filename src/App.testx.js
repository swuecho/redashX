import { render, screen } from '@testing-library/react';
import App from './components/demo/ProEditTable.tsx';

test('renders learn react link', () => {
   // TypeError: window.matchMedia is not a function
  render(<App />);
  const linkElement = screen.getByText(/活动/i);
  expect(linkElement).toBeInTheDocument();
});
