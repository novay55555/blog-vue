import * as Api from '../../apis/articles'

export default {
  namespaced: true,
  state: () => ({
    total: 1,
    page: 1,
    items: [],
    types: [],
    current: {}
  }),
  actions: {
    saveArticles({ commit }, page = 1) {
      return Api.fetchArticles(page).then(result =>
        commit('SAVE_ARTICLES', {
          total: result.total,
          page: result.page,
          items: result.articles
        })
      )
    },
    saveArticleTypes({ commit }) {
      return Api.fetchArticleTypes().then(result =>
        commit('SAVE_ARTICLE_TYPES', result)
      )
    },
    searchArticlesByTitle({ commit }, payload = {}) {
      payload.title = payload.title || 'awesome'
      payload.page = payload.page || 1

      const { title, page } = payload

      return Api.fetchArticlesByTitle(title, page).then(result =>
        commit('SAVE_ARTICLES', {
          total: result.total,
          page: result.page,
          items: result.articles
        })
      )
    },
    searchArticlesByType({ commit }, payload = {}) {
      payload.type = payload.type || 'awesome'
      payload.page = payload.page || 1

      const { type, page } = payload

      return Api.fetchArticlesByType(type, page).then(result =>
        commit('SAVE_ARTICLES', {
          total: result.total,
          page: result.page,
          items: result.articles
        })
      )
    },
    saveArticle({ commit }, id) {
      return Api.fetchArticle(id).then(result => commit('SAVE_ARTICLE', result))
    }
  },
  mutations: {
    SAVE_ARTICLES(state, payload) {
      state = {
        ...state,
        ...payload
      }
    },
    SAVE_ARTICLE_TYPES(state, types) {
      state.types = types
    },
    SAVE_ARTICLE(state, payload) {
      state.current = payload
    }
  }
}
