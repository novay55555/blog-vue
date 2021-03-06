import * as Api from '../../apis/articles'
import { formatDate } from '../../libs/utils'

export default {
  namespaced: true,
  state: () => ({
    total: 0,
    page: 0,
    items: [],
    types: [],
    typesId: '',
    isSearch: false,
    current: {}
  }),
  actions: {
    saveArticles({ state, commit }, page = 1) {
      page = Number(page)

      if (!state.isSearch && state.page === page) return Promise.resolve()

      return Api.fetchArticles(page).then(result => {
        result.isSearch = false
        commitSaveArticlesHelper(commit, result)
      })
    },
    saveArticleTypes({ state, commit }) {
      if (state.typesId) return Promise.resolve()

      return Api.fetchArticleTypes().then(result =>
        commit('SAVE_ARTICLE_TYPES', result)
      )
    },
    searchArticlesByTitle({ commit }, payload = {}) {
      payload.title = payload.title || ''
      payload.page = payload.page || 1

      const { title, page } = payload

      return Api.fetchArticlesByTitle(title, page).then(result => {
        result.isSearch = true
        commitSaveArticlesHelper(commit, result)
      })
    },
    searchArticlesByType({ commit }, payload = {}) {
      payload.type = payload.type || ''
      payload.page = payload.page || 1

      const { type, page } = payload

      return Api.fetchArticlesByType(type, page).then(result => {
        result.isSearch = true
        commitSaveArticlesHelper(commit, result)
      })
    },
    saveArticle({ state, commit }, id) {
      id = Number(id)

      if (state.current._id === id) return Promise.resolve()

      return Api.fetchArticle(id).then(result => {
        result.date = formatDate(result.date, 'yyyy-MM-dd')
        commit('SAVE_ARTICLE', result)
      })
    },
    addArticle({ commit }, payload) {
      return Api.fetchAddArticle(payload).then(result =>
        commit('ADD_ARTICLE', result)
      )
    },
    deleteArticle({ commit }, id) {
      return Api.fetchDeleteArticle(id).then(() => commit('DELETE_ARTICLE', id))
    },
    editArticle({ commit }, payload) {
      return Api.fetchEditArticle(payload).then(() => {
        payload._id = payload.id
        delete payload.id
        commit('EDIT_ARTICLE', payload)
      })
    }
  },
  mutations: {
    SAVE_ARTICLES(state, payload) {
      // TODO: 不能使用类似assign方法用一个新对象替换state
      // 如果是多层级嵌套, 应该可以针对某个属性进行assign修改
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    SAVE_ARTICLE_TYPES(state, payload) {
      state.types = payload.type
      state.typesId = payload._id
    },
    SAVE_ARTICLE(state, payload) {
      state.current = {
        ...state.current,
        ...payload
      }
    },
    ADD_ARTICLE(state, payload) {
      state.items.unshift(payload)
      state.items = state.items.filter((el, i, array) => i !== array.length - 1)
    },
    DELETE_ARTICLE(state, id) {
      state.items = state.items.filter(el => el._id !== id)
    },
    EDIT_ARTICLE(state, payload) {
      state.current = payload
      state.items = state.items.map(el => {
        if (el._id === payload._id) return Object.assign(el, payload)
        return el
      })
    }
  }
}

function commitSaveArticlesHelper(commit, result) {
  commit('SAVE_ARTICLES', {
    ...result,
    total: Math.ceil(result.total / 10),
    page: result.page,
    items: result.articles.map(el => {
      el.date = formatDate(el.date, 'yyyy-MM-dd')
      delete el.content
      return el
    })
  })
}
