const ArticleBody = ({ body }) => {
  return <div data-testId="articleBody" dangerouslySetInnerHTML={{ __html: body }} />
}

export default ArticleBody
