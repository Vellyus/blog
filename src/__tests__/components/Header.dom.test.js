 
import { render, screen } from '@testing-library/react';
import Header from '../../components/Header';

describe('Header DOM test', () => {
  it('should render', () => {
    render(<Header />);
    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
  });

  it('should be a header element', () => {
    render(<Header />);
    const header = screen.getByTestId('header');
    expect(header.tagName).toBe('HEADER');
  });
  
  it('should contain My Blog text', () => {
    render(<Header />);
    const header = screen.getByTestId('header');
    expect(header).toHaveTextContent('My Blog');
  });

});