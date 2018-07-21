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
import ArticlesStore from '../store/modules/articles.js'
import Lists from '../components/ArticleLists.vue'

const MODULE_NAME = 'articles'

export default {
  name: 'articles',
  components: {
    Lists
  },
  asyncData({ store }) {
    if (!ArticlesStore.registered) {
      store.registerModule(MODULE_NAME, ArticlesStore)
      ArticlesStore.registered = true
    }
    return store.dispatch(`${MODULE_NAME}/saveArticles`)
  },
  beforeCreate() {
    if (!ArticlesStore.registered) {
      this.$store.registerModule(MODULE_NAME, ArticlesStore, {
        preserveState: true
      })
      ArticlesStore.registered = true
    }
  },
  computed: mapState(MODULE_NAME, {
    articles: state => state.items,
    currentPage: state => state.page,
    total: state => state.total
  }),
  methods: {
    ...mapActions(MODULE_NAME, ['saveArticles']),
    async changePage(page) {
      this.$Progress.start()
      await this.saveArticles(page)
      window.scrollTo(0, 0)
      this.$Progress.finish()
    }
  }
}
</script>

<style>
</style>
