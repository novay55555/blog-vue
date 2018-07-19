<template>
  <div class="list-group">
    <router-link 
      v-for="(item, index) in data" 
      :key="index"
      :to="item.link"
      :event="''"
      class="list-group-item"
      @click.native="handler(item.link, item.handler)"
    >
      <span v-if="item.count" class='badge'>{{item.count}}</span>
      {{item.text}}
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
