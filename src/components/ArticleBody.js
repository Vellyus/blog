const ArticleBody = ({ body }) => {
  return <div data-testid="articleBody" dangerouslySetInnerHTML={{ __html: body }} />
}

export default ArticleBody
