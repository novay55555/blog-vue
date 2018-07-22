<template>
  <div class="list-group">
    <a 
      v-for="(item, index) in data" 
      :key="index"
      class="list-group-item"
      @click.prevent="handler(item.link, item.handler)"
    >
      <span v-if="item.count" class='badge'>{{item.count}}</span>
      {{item.text}}
    </a>
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
  },
  methods: {
    handler(link, handler) {
      if (handler) {
        return handler(link)
      }
      this.$router.push(link)
    }
  }
}
</script>
