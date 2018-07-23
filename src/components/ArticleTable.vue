<template>
  <div class="article-table">
    <Table :columns="columns" :datasource="data">
      <template slot-scope="props">
        <router-link v-if="props.text === 'title'" :to="props.record.link">{{props.record.title}}</router-link>
        <span v-else-if="props.text === 'operate'">
          <a href='#'>编辑</a>
          <a href='#'>删除</a>
        </span>
        <span v-else>{{props.text}}</span>
      </template>
    </Table>
  </div>
</template>

<script>
import Table from './Table.vue'

export default {
  name: 'article-table',
  components: {
    Table
  },
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      columns: [
        {
          title: '标题',
          key: 'title'
        },
        {
          title: '文章类型',
          key: 'articleType'
        },
        {
          title: '发表时间',
          key: 'date'
        },
        {
          title: '文章描述',
          key: 'description'
        },
        {
          title: '操作',
          key: 'operate'
        }
      ]
    }
  }
}
</script>

<style>
</style>
