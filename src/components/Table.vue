<template>
  <table class="table bs-table" :class="align">
    <thead>
      <tr>
        <th v-for="(item, index) in columns" :key="index">{{item.title}}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="data in datasource" :key="data.id">
        <td v-for="column in columns" :key="column.key">
          <slot :text="column.key" :value="data[column.key]" :record="data">
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
    },
    align: {
      type: String,
      default: 'center'
    }
  }
}
</script>

<style lang="scss">
$aligns: center left right;

.table {
  a {
    &:hover {
      color: #5bc0de;
    }
  }
  &.bs-table {
    tbody > tr > td,
    thead > tr > th {
      padding-top: 15px;
      padding-bottom: 15px;
    }
  }

  @each $align in $aligns {
    &.#{$align} {
      text-align: $align;
      th {
        text-align: $align;
      }
    }
  }
}
</style>
