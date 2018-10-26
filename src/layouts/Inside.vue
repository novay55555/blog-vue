<template>
  <div class="layout-inside">
    <Header 
      :data="navs" 
      :logo="logo"/>
    <div class="container">
      <slot/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '../components/Header.vue'

export default {
  name: 'LayoutInside',
  components: {
    Header
  },
  data() {
    return {
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
  },
  computed: mapState('account', {
    logo: state => state.admin.photoUrl
  })
}
</script>

<style lang="scss">
.layout-inside {
  & > .container {
    padding-top: 72px;
  }
}
</style>
