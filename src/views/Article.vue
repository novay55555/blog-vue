<template>
  <div class="article">
    <ArticleContent :data="article" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ArticleContent from '../components/ArticleContent.vue'

const MODULE_NAME = 'articles'

export default {
  name: 'one-article',
  components: {
    ArticleContent
  },
  asyncData({ store, route }) {
    return store.dispatch(`${MODULE_NAME}/saveArticle`, route.params.id)
  },
  computed: mapState(MODULE_NAME, {
    article: state => state.current
  })
}
</script>

<style>
</style>
