<template>
  <Layout :article-types="articleTypes">
    <div class="article">
      <ArticleContent :data="article" />
    </div>
  </Layout>
</template>

<script>
import { mapState } from 'vuex'
import { mixinArticle } from '../libs/mixins.js'
import Layout from '../layouts/MainPage.vue'
import ArticleContent from '../components/ArticleContent.vue'

const MODULE_NAME = 'articles'

export default {
  name: 'one-article',
  components: {
    Layout,
    ArticleContent
  },
  asyncData({ store, route }) {
    return Promise.all([
      store.dispatch('articles/saveArticleTypes'),
      store.dispatch(`${MODULE_NAME}/saveArticle`, route.params.id)
    ])
  },
  mixins: [mixinArticle],
  computed: {
    ...mapState(MODULE_NAME, {
      article: state => state.current
    })
  }
}
</script>

<style>
</style>
