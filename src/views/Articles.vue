<template>
  <div class="articles">
    <Lists :articles="articles" />
    <uiv-pagination 
      v-model="currentPage" 
      :total-page="10"
      align="center"
    />
  </div>
</template>

<script>
import { mockArray, formatDate } from '../libs/utils.js'
import Lists from '../components/ArticleLists.vue'

export default {
  name: 'articles',
  components: {
    Lists
  },
  computed: {
    currentPage: () => 1,
    articles: () =>
      mockArray().map((el, i) => ({
        title: 'title',
        author: 'author',
        date: formatDate(Date.now(), 'yyyy-MM-dd'),
        description: 'description',
        link: `/article/${i}`,
        articleType: 'articleType'
      }))
  }
}
</script>

<style>
</style>
