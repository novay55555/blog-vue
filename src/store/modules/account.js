import * as Api from '../../apis/account'
import {
  fetchAdmin as fetchFullAdmin,
  fetchUploadAvatar,
  fetchUpdateBlog
} from '../../apis/inside'

export default {
  namespaced: true,
  state: () => ({
    username: '',
    isAdmin: false,
    admin: {},
    captcha: ''
  }),
  actions: {
    signin({ commit }, payload) {
      const { username, password, captcha } = payload
      return Api.fetchSignin(username, password, captcha).then(result => {
        commit('SIGNIN', {
          username: result.username,
          isAdmin: result.isAdmin
        })
        commit('CLEAR_CAPTCHA')
      })
    },
    signup({ commit }, payload) {
      const { username, password, email, captcha } = payload
      return Api.fetchRegister(username, password, email, captcha).then(() => {
        commit('SIGN', {
          username,
          isAdmin: false
        })
        commit('CLEAR_CAPTCHA')
      })
    },
    signout({ commit }) {
      return Api.fetchSignout().then(() => commit('SIGNOUT'))
    },
    getAdmin({ commit }) {
      return Api.fetchAdmin().then(result => commit('GET_ADMIN', result))
    },
    getSession({ commit }, options = {}) {
      return Api.fetchSession(options)
        .then(result =>
          commit('SIGNIN', {
            username: result.username,
            isAdmin: result.isAdmin
          })
        )
        .catch(() => commit('SIGNOUT'))
    },
    getFullAdmin({ state, commit }, options = {}) {
      if (state.admin.password) return Promise.resolve()

      return fetchFullAdmin(options).then(result => commit('GET_ADMIN', result))
    },
    uploadAvatar(store, payload) {
      const { id, b64 } = payload

      return fetchUploadAvatar(id, b64)
    },
    updateBlog({ commit }, payload) {
      return fetchUpdateBlog(payload).then(() => {
        commit('GET_ADMIN', payload.admin)
        commit('SIGNIN', {
          username: payload.admin.name,
          isAdmin: true
        })
        commit(
          'articles/SAVE_ARTICLE_TYPES',
          { type: payload.types.data },
          { root: true }
        )
      })
    },
    getCaptcha({ commit }, payload) {
      return Api.fetchCaptcha(payload).then(result =>
        commit('GET_CAPTCHA', result)
      )
    }
  },
  mutations: {
    SIGNIN(state, payload) {
      state.username = payload.username
      state.isAdmin = payload.isAdmin
    },
    SIGNOUT(state) {
      state.username = ''
      state.isAdmin = false
    },
    GET_ADMIN(state, payload) {
      state.admin = {
        ...state.admin,
        ...payload
      }
    },
    GET_CAPTCHA(state, data) {
      state.captcha = data
    },
    CLEAR_CAPTCHA(state) {
      state.captcha = ''
    }
  }
}
