<template>
  <Layout :article-types="articleTypes">
    <div class="articles">
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

const MODULE_NAME = 'articles'

export default {
  name: 'articles',
  components: {
    Layout,
    Lists
  },
  asyncData({ store, route }) {
    return Promise.all([
      store.dispatch(`${MODULE_NAME}/saveArticles`, route.params.page),
      store.dispatch('articles/saveArticleTypes')
    ])
  },
  mixins: [mixinArticle],
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
