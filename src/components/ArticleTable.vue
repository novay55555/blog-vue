<template>
  <div class="article-table">
    <Table :columns="columns" :datasource="data">
      <template slot-scope="props">
        <router-link v-if="props.text === 'title'" :to="props.record.link">{{props.record.title}}</router-link>
        <span v-else-if="props.text === 'operate'">
          <a href='#'>编辑</a>
          <a href='#'>删除</a>
        </span>
        <span v-else>{{props.value}}</span>
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

<style lang="scss">
.article-table {
  .table {
    table-layout: fixed;
  }
  tbody > tr > td,
  thead > tr > th {
    padding-top: 15px;
    padding-bottom: 15px;
    text-align: center;
  }

  thead > tr > th {
    &:first-child {
      width: 40%;
    }
    &:nth-child(2),
    &:nth-child(3) {
      width: 120px;
    }
    &:nth-child(4) {
      width: 60%;
    }
    &:last-child {
      width: 100px;
    }
  }

  tbody > tr > td {
    &:first-child {
      a {
        display: block;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &:hover {
          color: #5bc0de;
        }
      }
    }
    &:nth-child(4) {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &:last-child {
      a {
        &:hover {
          color: #5bc0de;
        }
        &:nth-child(1) {
          float: left;
        }
        &:nth-child(2) {
          float: right;
        }
      }
    }
  }
}

@media (max-width: 480px) {
  .article-table {
    tbody > tr > td {
      &:nth-child(2),
      &:nth-child(3) {
        display: none;
      }
    }
    thead > tr > th {
      &:nth-child(2),
      &:nth-child(3) {
        display: none;
      }
      &:last-child {
        width: 85px;
      }
    }
  }
}
</style>
