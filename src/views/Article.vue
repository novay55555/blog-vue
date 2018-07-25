<template>
  <Layout>
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

export default {
  name: 'one-article',
  components: {
    Layout,
    ArticleContent
  },
  asyncData({ store, route }) {
    return store.dispatch('articles/saveArticle', route.params.id)
  },
  title() {
    return this.article.title
  },
  mixins: [mixinArticle],
  computed: {
    ...mapState('articles', {
      article: state => state.current
    })
  }
}
</script>

<style>
</style>
