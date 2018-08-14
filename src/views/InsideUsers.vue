<template>
  <Layout class="inside-users">
    <div class="clearfix">
      <Search @on-search="findUsers" placeholder="search user..." />
    </div>
    <Table 
      :data="users" 
      @on-delete="removeUser"
      @on-edit="getUser"
    />
    <uiv-pagination 
      :value="currentPage" 
      :total-page="total"
      align="center"
    />
    <Modal 
      :data="currentUser" 
      :visible.sync="modalVisible" 
      @on-submit="editUserInfo"
    />
  </Layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { mixinSeo } from '../libs/mixins.js'
import Layout from '../layouts/Inside.vue'
import Table from '../components/UserTable.vue'
import Search from '../components/SearchInputAnimated.vue'
import Modal from '../components/UserModal.vue'
import { asyncHandler } from '../libs/utils.js'

export default {
  name: 'inside-users',
  components: {
    Layout,
    Table,
    Search,
    Modal
  },
  asyncData({ store, ctx }) {
    return store.dispatch(
      'users/saveUsers',
      ctx ? { options: { headers: ctx.headers } } : {}
    )
  },
  data() {
    return {
      modalVisible: false
    }
  },
  mixins: [mixinSeo],
  computed: mapState('users', {
    users: state => state.items,
    currentPage: state => state.page,
    total: state => Math.ceil(state.total / 10),
    currentUser: state => state.current
  }),
  methods: {
    ...mapActions('users', [
      'saveUsers',
      'searchUsers',
      'deleteUser',
      'getCurrentUser',
      'editUser'
    ]),
    findUsers(username) {
      if (!username.trim()) return this.saveUsers()

      this.searchUsers({ username })
    },
    removeUser(id) {
      this.$uiv_confirm({
        title: '删除用户',
        content: '确定删除该用户?'
      })
        .then(() => this.deleteUser(id))
        .then(() => {
          this.$uiv_notify({
            type: 'success',
            content: '删除成功'
          })
        })
        .catch(() => {})
    },
    getUser(id) {
      this.getCurrentUser(id)
      this.setModalVisible(true)
    },
    setModalVisible(visible) {
      this.modalVisible = visible
    },
    editUserInfo(id, password, email) {
      asyncHandler(() =>
        this.editUser({
          id,
          password,
          email
        }).then(() =>
          this.$uiv_notify({
            type: 'success',
            content: '修改成功'
          })
        )
      )
    }
  }
}
</script>

<style lang="scss">
.inside-users {
  .search {
    float: right;
  }
}
</style>
