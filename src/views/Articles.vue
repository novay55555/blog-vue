<template>
  <Layout>
    <div v-if="articles.length" class="articles">
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

const fetchInitData = function(store, route) {
  return store.dispatch('articles/saveArticles', route.params.page)
}

export default {
  name: 'articles',
  components: {
    Layout,
    Lists
  },
  asyncData({ store, route }) {
    return fetchInitData(store, route)
  },
  meta() {
    return {
      keywords: ['文章列表', '博客', 'articles', 'blog'],
      description: 'This is a blog powered by a frontend developer.'
    }
  },
  mixins: [mixinArticle],
  async created() {
    if (!this.articles.length) {
      await fetchInitData(this.$store, this.$route)
    }
  },
  methods: {
    ...mapActions('articles', ['saveArticles']),
    async changePage(page) {
      this.$Progress.start()
      await this.saveArticles(page)
      this.$Progress.finish()
      this.$router.push({
        path: `/articles/${page}`
      })
    }
  }
}
</script>

<style>
</style>
