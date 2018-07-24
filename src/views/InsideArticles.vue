<template>
  <Layout class="inside-articles">
    <uiv-tabs v-model="activeTabIndex" @change="changeTab">
      <uiv-tab title="文章列表">
        <div class="clearfix">
          <div class="search-wrapper">
            <Search 
              placeholder="search articles..." 
              @on-focus="searchFocus"
              @on-blur="searchBlur"
              @on-search="search"
            />
          </div>
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
import $ from 'jquery'
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
    async changePage(page) {
      this.loadingTable = true
      await this.saveArticles(page)
      this.loadingTable = false
    },
    async submitArticle(article) {
      if (this.articleMode === 'add') {
        await this.addArticle(article)
      } else {
        await this.editArticle(article)
      }

      this.$uiv_notify({
        type: 'success',
        content: this.articleMode === 'add' ? '发布成功' : '编辑成功'
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
    async showEditArticle(id) {
      await this.saveArticle(id)
      this.changeMode('edit')
      this.changeTab(1)
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
    searchFocus(e) {
      $(e.target)
        .closest('.search-wrapper')
        .addClass('active')
    },
    searchBlur(e) {
      $(e.target)
        .closest('.search-wrapper')
        .removeClass('active')
    },
    async search(title) {
      if (!title.trim()) return this.saveArticles()

      await this.searchArticlesByTitle({ title })
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
