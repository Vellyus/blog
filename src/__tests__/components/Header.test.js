import {render, screen, within} from '@testing-library/react'
import Header from '../../components/Header';

/* 
 - header renderelodik 
 - megjelenik benne a My Blog szöveg
*/

// Csoportositja a teszt esetek
describe('Header', () => {

  // Egy teszt eset
  it('should rendered', () => {
    // rendereljük a komponenst
    const renderedHeader = '';  // elvart eredmeny
    render(<Header />); 
    const resultHeader = screen.getAllByTestId('header'); // kapjuk az eredmenyt
    // assertion
    expect(resultHeader).not.toBeNull();
  });

  it('should contain My Blog text', () => {
    const content = 'My Blog'  // elvart eredmeny
    render(<Header />); 
    const resultHeader = screen.getAllByTestId('header'); // kapjuk az eredmenyt
    // assertion
    expect(screen.getByText(content)).not.toBeNull();
  });

});