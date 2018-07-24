<template>
  <div 
    class="search-input-animated"
    :style="{
      width: animated ? resolveWidth(animatedWidth) : resolveWidth(width)
    }"
  >
    <Search 
      :placeholder="placeholder" 
      @on-focus="focus"
      @on-blur="blur"
      @on-search="search"
    />
  </div>
</template>

<script>
import Search from './SearchInput.vue'

export default {
  name: 'search-input-animated',
  components: {
    Search
  },
  props: {
    width: {
      type: Number | String,
      default: 200
    },
    animatedWidth: {
      type: Number | String,
      default: '100%'
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      animated: false
    }
  },
  methods: {
    focus() {
      this.animated = true
    },
    blur() {
      this.animated = false
    },
    search(value) {
      this.$emit('on-search', value)
    },
    resolveWidth(width) {
      typeof width === 'string' ? width : (width = parseFloat(width) + 'px')
      return width
    }
  }
}
</script>

<style lang="scss">
.search-input-animated {
  float: right;
  width: 200px;
  transition: width 0.25s;
}
</style>
