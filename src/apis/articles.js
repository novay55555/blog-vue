import ajax from '../libs/ajax'

export const fetchArticles = (page = 1) => ajax.get(`/api/articles/${page}`)

export const fetchArticleTypes = () => ajax.get('/api/articles/types')

export const fetchArticle = id => ajax.get(`/api/article/${id}`)

export const fetchArticlesByTitle = (title, page = 1) =>
  ajax.get(`/api/articles/search/title/${title}/${page}`)

export const fetchArticlesByType = (type, page = 1) =>
  ajax.get(`/api/articles/search/type/${type}/${page}`)
