<template>
  <div class="article-content">
    <h2>{{ data.title }}</h2>
    <Intro :data="data" />
    <div 
      class="text" 
      v-html="markedContent(data.content)"
    />
  </div>
</template>

<script>
import marked from 'marked'
import { loadPlugin, querySelectors } from '../libs/utils.js'
import Intro from './ArticleIntro.vue'

export default {
  name: 'ArticleContent',
  components: {
    Intro
  },
  props: {
    data: Object
  },
  mounted() {
    loadPlugin('highlightjs').then(() => {
      querySelectors('pre code', this.$el).forEach(block => {
        hljs.highlightBlock(block)
      })
    })
  },
  methods: {
    markedContent(text = '') {
      return marked(text)
    }
  }
}
</script>

<style lang="scss">
.article-content {
  ol {
    padding-left: 20px;
    list-style-type: decimal;
  }
  ul {
    padding-left: 20px;
    list-style-type: disc;
  }
  img {
    margin: 10px auto;
    display: block;
    max-width: 100%;
    cursor: pointer;
    &:hover {
      box-shadow: 0 0 20px #999;
    }
  }
  .text {
    * {
      word-break: break-all;
      word-wrap: break-word;
    }
    pre {
      padding: 0;
      font-size: 14px;
    }
  }
}

@media (max-width: 500px) {
  .article-content {
    .text {
      code {
        width: 150%;
      }
    }
  }
}
</style>
