import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('should render the Navbar component', () => {
    render(<Navbar />);
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Products/i)).toBeInTheDocument();
  });
});
// The `expect` function is already provided by the testing library, so you don't need to implement it manually.
// You can safely remove the placeholder function as it is redundant and unnecessary.
