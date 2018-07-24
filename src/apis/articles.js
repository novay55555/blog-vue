import ajax from '../libs/ajax'

export const fetchArticles = (page = 1) => ajax.get(`/api/articles/${page}`)

export const fetchArticleTypes = () => ajax.get('/api/articles/types')

export const fetchArticle = id => ajax.get(`/api/article/${id}`)

export const fetchArticlesByTitle = (title, page = 1) =>
  ajax.get(`/api/articles/search/title/${title}/${page}`)

export const fetchArticlesByType = (type, page = 1) =>
  ajax.get(`/api/articles/search/type/${type}/${page}`)

export const fetchAddArticle = article =>
  ajax.post(`/api/inside/article/publish`, article)

export const fetchDeleteArticle = id =>
  ajax.delete(`/api/inside/article/delete/${id}`)

export const fetchEditArticle = article =>
  ajax.put(`/api/inside/article/update`, article)
