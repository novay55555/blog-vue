<template>
  <Layout class="inside-articles">
    <uiv-tabs>
      <uiv-tab title="文章列表">
        <div class="clearfix">
          <div class="search-wrapper">
            <Search placeholder="search articles..." />
          </div>
          <Table :data="tableData" />
        </div>
      </uiv-tab>
      <uiv-tab title="文章发布">
        发布form
      </uiv-tab>
    </uiv-tabs>
  </Layout>
</template>

<script>
import Layout from '../layouts/Inside.vue'
import Search from '../components/SearchInput.vue'
import Table from '../components/ArticleTable.vue'

export default {
  name: 'inside-articles',
  components: {
    Layout,
    Search,
    Table
  },
  data() {
    return {
      tableData: [
        {
          id: 1,
          title: 'title',
          articleType: 'javascript',
          date: '2018.10.10',
          description: 'description',
          link: '/article/30'
        }
      ]
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
