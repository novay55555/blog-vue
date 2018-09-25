<template>
  <div class="article-lists">
    <ul class="list-group">
      <li 
        v-for="(item, index) in data" 
        :key="index"
      >
        <router-link 
          :to="'/article/' + item._id" 
          class="list-group-item"
        >
          <h3>{{ item.title }}</h3>
          <Intro :data="item" />
          <p>{{ item.description }}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Intro from './ArticleIntro.vue'

export default {
  name: 'ArticleLists',
  components: {
    Intro
  },
  props: {
    data: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss">
.article-lists {
  li {
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
  }
  .list-group-item {
    border: none;
    border-radius: 10px;
    color: #31708f;
    cursor: pointer;
    & > h3 {
      color: #800080;
    }
  }
}
</style>
