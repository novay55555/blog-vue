<template>
  <Layout>
    <Table :data="users" />
    <uiv-pagination 
      :value="currentPage" 
      :total-page="total"
      align="center"
    />
  </Layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Layout from '../layouts/Inside.vue'
import Table from '../components/UserTable.vue'

export default {
  name: 'inside-users',
  components: {
    Layout,
    Table
  },
  asyncData({ store, ctx }) {
    return store.dispatch(
      'users/saveUsers',
      ctx ? { options: { headers: ctx.headers } } : {}
    )
  },
  computed: mapState('users', {
    users: state => state.items,
    currentPage: state => state.page,
    total: state => Math.ceil(state.total / 10)
  }),
  methods: {
    ...mapActions('users', ['saveUsers'])
  }
}
</script>

<style>
</style>
