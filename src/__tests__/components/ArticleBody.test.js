import { render, screen } from '@testing-library/react';
import ArticleBody from '../../components/ArticleBody';

describe('ArticleBody', () => {

  it('should rendered', () => {
    render(<ArticleBody />);
    const resultArticleBody = screen.getByTestId('articleBody');
    expect(resultArticleBody).not.toBeNull();
  });

  it('should contain The body of the article"', () => {
    const content = "The body of the article";
    render(<ArticleBody body={ "The body of the article" } />
    );
    const resultArticleBody = screen.getByTestId('articleBody');
    expect(resultArticleBody).toHaveTextContent(content);
  });

});