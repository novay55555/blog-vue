import * as Api from '../../apis/inside'

export default {
  namespaced: true,
  state: {
    items: [],
    page: 0,
    total: 0,
    current: {}
  },
  actions: {
    saveUsers({ commit }, payload = {}) {
      let { page = 1, options } = payload

      return Api.fetchUsers(page, options).then(result =>
        commitSaveUsersHelper(commit, result)
      )
    },
    searchUsers({ commit }, payload) {
      let { username, page = 1 } = payload

      return Api.fetchUsersByName(username, page).then(result =>
        commitSaveUsersHelper(commit, result)
      )
    },
    deleteUser({ commit }, id) {
      return Api.fetchDeleteUser(id).then(() => commit('DELETE_USER', id))
    },
    getCurrentUser({ state, commit }, id) {
      const current = state.items.filter(el => el._id === id)[0]

      commit('GET_CURRENT_USER', current)
    },
    editUser({ commit }, payload) {
      const { id, password, email } = payload
      return Api.fetchEditUser(id, password, email).then(() =>
        commit('EDIT_USER', { _id: id, password, email })
      )
    }
  },
  mutations: {
    SAVE_USERS(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    DELETE_USER(state, id) {
      state.items = state.items.filter(el => el._id !== id)
    },
    GET_CURRENT_USER(state, payload) {
      state.current = payload
    },
    EDIT_USER(state, payload) {
      state.current = {
        ...state.current,
        ...payload
      }
      state.items = state.items.map(el => {
        if (el._id === payload._id) return Object.assign(el, payload)

        return el
      })
    }
  }
}

function commitSaveUsersHelper(commit, result) {
  commit('SAVE_USERS', {
    total: result.total,
    page: result.page,
    items: result.users
  })
}
