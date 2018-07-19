<template>
  <div class="list-group">
    <router-link 
      v-for="(item, index) in data" 
      :key="index"
      :to="item.link"
      class="list-group-item"
    >
      {{list.count ? <span class='badge'>{list.count}</span> : ''}}
      {{list.text}}
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'list-group',
  props: {
    data: {
      type: Array,
      required: true
    }
  }
}
</script>
