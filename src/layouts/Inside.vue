<template>
  <div class="layout-inside">
    <Header :data="navs" :logo="logo" />
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'

export default {
  name: 'layout-inside',
  components: {
    Header
  },
  data() {
    return {
      logo: 'https://aijiang.ga/img/avatar-1505029156458.jpeg',
      navs: [
        {
          text: '文章管理',
          path: '/inside-world/articles'
        },
        {
          text: '用户管理',
          path: '/inside-world/users'
        },
        {
          text: '博客管理',
          path: '/inside-world/admin'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.layout-inside {
  & > .container {
    padding-top: 72px;
  }
}
</style>
