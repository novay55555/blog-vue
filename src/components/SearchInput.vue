<template>
  <div class="search-input form-group">
    <input
      class="form-control" 
      type="text"
      v-model="value"
      :placeholder="placeholder"
      @keyup.enter="search"
    />
    <a 
      href="#" 
      class="glyphicon glyphicon-search"
      @click.prevent="search"
    />
  </div>
</template>

<script>
export default {
  name: 'search-input',
  props: {
    placeholder: {
      type: String,
      default: 'Search something...'
    }
  },
  data() {
    return {
      value: ''
    }
  },
  methods: {
    search() {
      this.$emit('on-search', this.value)
    }
  }
}
</script>

<style lang="scss">
.search-input {
  position: relative;
  margin-bottom: 0;
  input {
    padding-right: 30px;
  }
  .glyphicon {
    position: absolute;
    top: 50%;
    right: 5px;
    padding: 5px;
    transform: translate(0, -50%);
    font-size: 1.1em;
    color: #333;
    cursor: pointer;
    &:hover {
      color: #ff0000;
    }
  }
}
</style>
