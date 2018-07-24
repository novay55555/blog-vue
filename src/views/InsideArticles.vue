<template>
  <Layout class="inside-articles">
    <uiv-tabs v-model="activeTabIndex" @change="changeTab">
      <uiv-tab title="文章列表">
        <div class="clearfix">
          <div class="search-wrapper">
            <Search placeholder="search articles..." />
          </div>
          <Table 
            :data="articles" 
            @on-delete="removeArticle" 
          />
          <uiv-pagination 
            :value="currentPage" 
            :total-page="total"
            align="center"
            @change="changePage"
          />
        </div>
      </uiv-tab>
      <uiv-tab title="文章发布">
        <Form 
          :article-types="articleTypes"
          :active-index="activeTabIndex"
          :current-index="1"
          @submit-article="submitArticle"
        />
      </uiv-tab>
    </uiv-tabs>
  </Layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { mixinArticle } from '../libs/mixins.js'
import Layout from '../layouts/Inside.vue'
import Search from '../components/SearchInput.vue'
import Table from '../components/ArticleTable.vue'
import Form from '../components/ArticleForm.vue'

export default {
  name: 'inside-articles',
  components: {
    Layout,
    Search,
    Table,
    Form
  },
  asyncData({ store }) {
    return store.dispatch('articles/saveArticles')
  },
  mixins: [mixinArticle],
  data() {
    return {
      activeTabIndex: 0
    }
  },
  computed: mapState('articles', {
    articles: state =>
      state.items.map(el => {
        el.link = `/article/${el._id}`
        return el
      }),
    articleTypes: state => state.types
  }),
  methods: {
    ...mapActions('articles', ['saveArticles', 'addArticle', 'deleteArticle']),
    changePage(page) {
      this.saveArticles(page)
    },
    async submitArticle(article) {
      if (article.id) {
        return false
      } else {
        delete article.id
        await this.addArticle(article)
      }

      this.$uiv_notify({
        type: 'success',
        content: '发布成功'
      })
    },
    removeArticle(id) {
      this.$uiv_confirm({
        title: '删除文章',
        content: '确认删除该文章?'
      })
        .then(() => {
          this.$uiv_notify('正在删除...')
          this.deleteArticle(id)
        })
        .then(() => {
          this.$uiv_notify({
            type: 'success',
            content: '删除成功'
          })
        })
        .catch(() => {})
    },
    changeTab(index) {
      this.activeTabIndex = index
    }
  }
}
</script>

<style lang="scss">
.inside-articles {
  .nav-tabs {
    margin-bottom: 20px;
  }
  .search-wrapper {
    float: right;
    width: 200px;
    transition: width 0.25s;
    &.active {
      width: 100%;
    }
  }
}
</style>
