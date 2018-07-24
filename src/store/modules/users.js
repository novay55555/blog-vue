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
    saveUsers({ commit }, payload) {
      let { page = 1, options } = payload

      return Api.fetchUsers(page, options).then(result =>
        commitSaveUsersHelper(commit, result)
      )
    }
  },
  mutations: {
    SAVE_USERS(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
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
