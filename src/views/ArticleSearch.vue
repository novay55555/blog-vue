<template>
  <Layout>
    <div v-if="articles.length" class="article-search">
      <Lists :data="articles" />
      <uiv-pagination 
        :value="currentPage" 
        :total-page="total"
        align="center"
        @change="changePage"
      />
    </div>
  </Layout>
</template>

<script>
import { mapActions } from 'vuex'
import { mixinArticle } from '../libs/mixins.js'
import Layout from '../layouts/MainPage.vue'
import Lists from '../components/ArticleLists.vue'

export default {
  name: 'article-search',
  components: {
    Layout,
    Lists
  },
  asyncData({ store, route }) {
    if (route.query.type)
      return store.dispatch('articles/searchArticlesByType', route.query)

    if (route.query.title)
      return store.dispatch('articles/searchArticlesByTitle', route.query)
  },
  title() {
    const { type, title } = this.$route.query

    return `Search - ${type || title}`
  },
  mixins: [mixinArticle],
  watch: {
    $route: async function(n) {
      const { type, title } = n.query

      if (type) {
        this.$Progress.start()
        await this.searchArticlesByType(n.query)
        this.$Progress.finish()
      }

      if (title) {
        this.$Progress.start()
        await this.searchArticlesByTitle(n.query)
        this.$Progress.finish()
      }

      document.title = `Search - ${type || title}`
    }
  },
  methods: {
    ...mapActions('articles', [
      'searchArticlesByTitle',
      'searchArticlesByType'
    ]),
    changePage(page) {
      let query = Object.assign({}, this.$route.query)
      query.page = page

      this.$router.push({
        path: '/search',
        query
      })
    }
  }
}
</script>

<style>
</style>
