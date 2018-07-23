<template>
  <table class="table">
    <thead>
      <tr>
        <th v-for="(item, index) in columns" :key="index">{{item.title}}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="data in datasource" :key="data.id">
        <td v-for="column in columns" :key="column.key">
          <slot :text="column.key" :record="data">
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'bootstrap-table',
  props: {
    columns: {
      type: Array,
      required: true
    },
    datasource: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>
</style>
