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
  asyncData({ store }) {
    return store.dispatch(`${MODULE_NAME}/saveArticles`)
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
