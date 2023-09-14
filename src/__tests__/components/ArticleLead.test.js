import { render, screen } from '@testing-library/react';
import ArticleLead from '../../components/ArticleLead';

describe('ArticleLead', () => {

  it('should rendered', () => {
    render(<ArticleLead />);
    const resultArticleLead = screen.getByTestId('articleLead');
    expect(resultArticleLead).not.toBeNull();
  });

  it('should contain The lead of the article"', () => {
    const content = "The lead of the article";
    render(<ArticleLead lead={ "The lead of the article" } />
    );
    const resultArticleLead = screen.getByTestId('articleLead');
    expect(resultArticleLead).toHaveTextContent(content);
  });

});