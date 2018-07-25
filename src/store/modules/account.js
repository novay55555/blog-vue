import * as Api from '../../apis/account'
import {
  fetchAdmin as fetchFullAdmin,
  fetchUploadAvatar
} from '../../apis/inside'

export default {
  namespaced: true,
  state: {
    username: '',
    isAdmin: false,
    admin: {}
  },
  actions: {
    signin({ commit }, payload) {
      const { username, password } = payload
      return Api.fetchSignin(username, password).then(result =>
        commit('SIGNIN', {
          username: result.username,
          isAdmin: result.isAdmin
        })
      )
    },
    signup(store, payload) {
      const { username, password, email } = payload
      return Api.fetchRegister(username, password, email)
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
    }
  }
}
