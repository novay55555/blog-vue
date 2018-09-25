<template>
  <div class="article-intro">
    <span>作者: {{ data.author }}</span>
    <span>时间: {{ data.date }}</span>
    <span :class="'label label-' + randomLabelType()">{{ data.articleType }}</span>
  </div>
</template>

<script>
export default {
  name: 'ActicleIntro',
  props: {
    data: Object
  },
  data() {
    return {
      labelTypes: ['default', 'primary', 'success', 'info', 'warning', 'danger']
    }
  },
  methods: {
    randomLabelType() {
      return this.labelTypes[Math.floor(Math.random() * this.labelTypes.length)]
    }
  }
}
</script>

<style lang="scss">
.article-intro {
  margin-bottom: 10px;
  span {
    margin-right: 15px;
  }
  .label {
    font-size: 100%;
    font-weight: 400;
  }
}

@media (max-width: 500px) {
  .article-intro {
    span {
      &:nth-child(1) {
        display: none;
      }
    }
  }
}
</style>
