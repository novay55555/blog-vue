<template>
  <Layout class="inside-articles">
    <uiv-tabs 
      v-model="activeTabIndex" 
      @change="changeTab"
    >
      <uiv-tab title="文章列表">
        <div class="clearfix">
          <Search 
            class="search"
            placeholder="search articles..." 
            @on-search="search"
          />
        </div>
        <Table 
          :data="articles" 
          :loading="loadingTable"
          @on-delete="removeArticle" 
          @on-edit="showEditArticle"
        />
        <uiv-pagination 
          :value="currentPage" 
          :total-page="total"
          align="center"
          @change="changePage"
        />
      </uiv-tab>
      <uiv-tab title="文章发布">
        <Form 
          :article-types="articleTypes"
          :active-index="activeTabIndex"
          :current-index="1"
          :article="currentArticle"
          :mode="articleMode"
          @submit-article="submitArticle"
        />
      </uiv-tab>
    </uiv-tabs>
  </Layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { mixinArticle } from '../libs/mixins.js'
import { asyncHandler } from '../libs/utils.js'
import Layout from '../layouts/Inside.vue'
import Search from '../components/SearchInputAnimated.vue'
import Table from '../components/ArticleTable.vue'
import Form from '../components/ArticleForm.vue'

export default {
  name: 'InsideArticles',
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
      activeTabIndex: 0,
      articleMode: 'add',
      loadingTable: false
    }
  },
  computed: mapState('articles', {
    articles: state =>
      state.items.map(el => {
        el.link = `/article/${el._id}`
        return el
      }),
    articleTypes: state => state.types,
    currentArticle: state => state.current
  }),
  methods: {
    ...mapActions('articles', [
      'saveArticles',
      'addArticle',
      'deleteArticle',
      'saveArticle',
      'editArticle',
      'searchArticlesByTitle'
    ]),
    changePage(page) {
      asyncHandler(() => this.saveArticles(page), {
        start: () => this.setLoading(true),
        end: () => this.setLoading(false)
      })
    },
    submitArticle(article) {
      let p
      if (this.articleMode === 'add') {
        p = this.addArticle(article)
      } else {
        p = this.editArticle(article)
      }

      asyncHandler(() => p).then(() => {
        this.$uiv_notify({
          type: 'success',
          content: this.articleMode === 'add' ? '发布成功' : '编辑成功'
        })
      })
    },
    removeArticle(id) {
      this.$uiv_confirm({
        title: '删除文章',
        content: '确认删除该文章?'
      })
        .then(() => {
          this.$uiv_notify('正在删除...')
          return this.deleteArticle(id)
        })
        .then(() => {
          this.$uiv_notify({
            type: 'success',
            content: '删除成功'
          })
        })
        .catch(() => {})
    },
    showEditArticle(id) {
      asyncHandler(() => this.saveArticle(id), {
        start: () => this.setLoading(true),
        end: () => this.setLoading(false)
      }).then(() => {
        this.changeMode('edit')
        this.changeTab(1)
      })
    },
    changeTab(index) {
      if (index !== 1) {
        this.changeMode('add')
      }

      this.activeTabIndex = index
    },
    changeMode(mode) {
      this.articleMode = mode
    },
    search(title) {
      let p
      if (!title.trim()) {
        p = this.saveArticles()
      } else {
        p = this.searchArticlesByTitle({ title })
      }

      asyncHandler(() => p)
    },
    setLoading(isLoding) {
      this.loadingTable = isLoding
    }
  }
}
</script>

<style lang="scss">
.inside-articles {
  .nav-tabs {
    margin-bottom: 20px;
  }
  .search {
    float: right;
  }
}
</style>
