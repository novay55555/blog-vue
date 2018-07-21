<template>
  <div class="article-lists">
    <ul class="list-group">
      <li v-for="(item, index) in data" :key="index">
        <router-link :to="'/article/' + item._id" class="list-group-item">
          <h3>{{item.title}}</h3>
          <p>
            <span>作者: {{item.author}}</span>
            <span>时间: {{item.date}}</span>
            <span :class="'label label-' + randomLabelType()">{{item.articleType}}</span>
          </p>
          <p>{{item.description}}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'article-lists',
  props: {
    data: {
      type: Array,
      required: true
    }
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
    span {
      margin-right: 15px;
    }
  }
  .label {
    font-size: 100%;
    font-weight: 400;
  }
}

@media (max-width: 500px) {
  .article-lists {
    .list-group-item {
      span {
        &:nth-child(1) {
          display: none;
        }
      }
    }
  }
}
</style>
