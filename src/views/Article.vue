<template>
  <div class="article">
    <ArticleContent :data="article" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ArticleStore from '../store/modules/articles.js'
import ArticleContent from '../components/ArticleContent.vue'

const MODULE_NAME = 'articles'

export default {
  name: 'one-article',
  components: {
    ArticleContent
  },
  asyncData({ store, route }) {
    if (!ArticleStore.registered) {
      store.registerModule(MODULE_NAME, ArticleStore)
      ArticleStore.registered = true
    }
    return store.dispatch(`${MODULE_NAME}/saveArticle`, route.params.id)
  },
  beforeCreate() {
    if (!ArticleStore.registered) {
      this.$store.registerModule(MODULE_NAME, ArticleStore, {
        preserveState: true
      })
      ArticleStore.registered = true
    }
  },
  computed: mapState(MODULE_NAME, {
    article: state => state.current
  })
}
</script>

<style>
</style>
