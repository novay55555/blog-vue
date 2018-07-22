<template>
  <div class="articles">
    <Lists :data="articles" />
    <uiv-pagination 
      :value="currentPage" 
      :total-page="total"
      align="center"
      @change="changePage"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Lists from '../components/ArticleLists.vue'

const MODULE_NAME = 'articles'

export default {
  name: 'articles',
  components: {
    Lists
  },
  asyncData({ store, route }) {
    return store.dispatch(
      `${MODULE_NAME}/saveArticles`,
      Number(route.params.page)
    )
  },
  computed: mapState(MODULE_NAME, {
    articles: state => state.items,
    currentPage: state => state.page,
    total: state => state.total
  }),
  watch: {
    $route: async function(n, o) {
      if (n.params.page !== o.params.page) {
        this.$Progress.start()
        await this.saveArticles(n.params.page)
        window.scrollTo(0, 0)
        this.$Progress.finish()
      }
    }
  },
  methods: {
    ...mapActions(MODULE_NAME, ['saveArticles']),
    changePage(page) {
      this.$router.push({
        path: `/articles/${page}`
      })
    }
  }
}
</script>

<style>
</style>
