<template>
  <div class="user-table">
    <Table 
      :columns="columns" 
      :datasource="data"
    >
      <template slot-scope="props">
        <span v-if="props.text === 'operate'">
          <a 
            href="#" 
            @click.prevent="editUser(props.record._id)"
          >编辑</a>
          <a 
            href="#" 
            @click.prevent="deleteUser(props.record._id)"
          >删除</a>
        </span>
        <span v-else>{{ props.value }}</span>
      </template>
    </Table>
  </div>
</template>

<script>
import Table from './Table.vue'

export default {
  name: 'UserTable',
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
  },
  methods: {
    deleteUser(id) {
      this.$emit('on-delete', id)
    },
    editUser(id) {
      this.$emit('on-edit', id)
    }
  }
}
</script>

<style lang="scss">
.user-table {
  th {
    width: 33%;
  }
  td:last-child a:nth-child(1) {
    margin-right: 5%;
  }
}
</style>
