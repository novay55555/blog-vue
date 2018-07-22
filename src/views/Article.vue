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
    return Promise.all([
      store.dispatch('articles/saveArticleTypes'),
      store.dispatch('articles/saveArticle', route.params.id),
      store.dispatch('account/getAdmin')
    ])
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
