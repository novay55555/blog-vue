import * as Api from '../../apis/articles'
import { formatDate } from '../../libs/utils'

export default {
  namespaced: true,
  state: {
    total: 1,
    page: 1,
    items: [],
    types: [],
    current: {}
  },
  actions: {
    saveArticles({ commit }, page = 1) {
      return Api.fetchArticles(page).then(result =>
        commit('SAVE_ARTICLES', {
          total: Math.ceil(result.total / 10),
          page: result.page,
          items: result.articles.map(el => {
            el.date = formatDate(el.date, 'yyyy-MM-dd')
            return el
          })
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
      return Api.fetchArticle(id).then(result => {
        result.date = formatDate(result.date, 'yyyy-MM-dd')
        commit('SAVE_ARTICLE', result)
      })
    }
  },
  mutations: {
    SAVE_ARTICLES(state, payload) {
      // TODO: 不能使用类似assign方法用一个新对象替换state
      // 我猜测是state是个函数返回的实例, 只能直接内部修改
      // 如果是多层级嵌套, 应该可以针对某个属性进行assign修改
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    SAVE_ARTICLE_TYPES(state, types) {
      state.types = types
    },
    SAVE_ARTICLE(state, payload) {
      state.current = payload
    }
  }
}
