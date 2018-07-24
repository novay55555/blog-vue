<template>
  <div class="user-table">
    <Table :columns="columns" :datasource="data">
      <template slot-scope="props">
        <span v-if="props.text === 'operate'">
          <a href="#">编辑</a>
          <a href="#">删除</a>
        </span>
        <span v-else>{{props.value}}</span>
      </template>
    </Table>
  </div>
</template>

<script>
import Table from './Table.vue'

export default {
  name: 'user-table',
  components: {
    Table
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      columns: [
        {
          title: '用户名',
          key: 'name'
        },
        {
          title: '邮箱地址',
          key: 'email'
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

<style lang="scss">
.user-table {
  tbody > tr > td,
  thead > tr > th {
    padding-top: 15px !important;
    padding-bottom: 15px !important;
    text-align: center;
  }
  th {
    width: 33%;
  }

  td:last-child a:nth-child(1) {
    margin-right: 5%;
  }
}
</style>
