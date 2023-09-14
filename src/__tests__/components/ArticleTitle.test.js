import { render, screen } from '@testing-library/react';
import ArticleTitle from '../../components/ArticleTitle';

describe('ArticleTitle', () => {

  it('should rendered', () => {
    render(<ArticleTitle />);
    const resultArticleTitle = screen.getByTestId('articleTitle');
    expect(resultArticleTitle).not.toBeNull();
  });

  it('should contain The title of the article"', () => {
    const content = "The title of the article";
    render(<ArticleTitle title={ "The title of the article" } />
    );
    const resultArticleTitle = screen.getByTestId('articleTitle');
    expect(resultArticleTitle).toHaveTextContent(content);
  });

});