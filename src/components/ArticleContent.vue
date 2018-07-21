<template>
  <div class="article-content">
    <h2>{{data.title}}</h2>
    <p>
      <span>{{data.author}}</span>
      <span>{{data.date}}</span>
      <span>{{data.articleType}}</span>
    </p>
    <div v-html="markedContent(data.content)" class="text">
    </div>
  </div>
</template>

<script>
import marked from 'marked'

export default {
  name: 'article-content',
  props: {
    data: Object
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
  & > p > span {
    margin-right: 15px;
  }
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
    & > p > span:nth-child(1) {
      display: none;
    }
    .text {
      code {
        width: 150%;
      }
    }
  }
}
</style>
