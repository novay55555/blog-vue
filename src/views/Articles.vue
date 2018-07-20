<template>
  <div class="articles">
    <Lists :articles="articles" />
    <uiv-pagination 
      v-model="currentPage" 
      :total-page="total"
      align="center"
    />
  </div>
</template>

<script>
import ArticlesStore from '../store/modules/articles.js'
import Lists from '../components/ArticleLists.vue'

const MODULE_NAME = 'articles'

export default {
  name: 'articles',
  components: {
    Lists
  },
  asyncData({ store }) {
    store.registerModule(MODULE_NAME, ArticlesStore)
    return store.dispatch(`${MODULE_NAME}/saveArticles`)
  },
  destroyed() {
    this.$store.unregisterModule(MODULE_NAME)
  },
  computed: {
    articles() {
      return this.$store.state[MODULE_NAME].items
    },
    currentPage() {
      return this.$store.state[MODULE_NAME].page
    },
    total() {
      return this.$store.state[MODULE_NAME].total
    }
  }
}
</script>

<style>
</style>
