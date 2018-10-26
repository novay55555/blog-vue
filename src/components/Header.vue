<template>
  <div class="header">
    <uiv-navbar inverse>
      <router-link 
        class="navbar-brand" 
        to="/">
        <img 
          :src="logo || ''" 
          alt="">
      </router-link>
      <template slot="collapse">
        <uiv-navbar-nav>
          <li 
            v-for="(item, index) in data" 
            :key="index"
            :class="$route.path === item.path ? 'active' : ''">
            <router-link :to="item.path">{{ item.text }}</router-link>
          </li>
        </uiv-navbar-nav>
      </template>
    </uiv-navbar>
  </div>
</template>

<script>
export default {
  name: 'NavHeader',
  props: {
    data: {
      type: Array,
      required: true
    },
    logo: String
  }
}
</script>

<style lang="scss">
.header {
  position: fixed;
  top: 0;
  width: 100%;
  opacity: 0.95;
  z-index: 1045;
  overflow: hidden;
  .nav {
    .active a {
      pointer-events: none;
    }
  }
  .navbar-brand {
    padding: 7px;
    width: 50px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

@media (max-width: 768px) {
  .header {
    .navbar-brand {
      position: absolute;
      left: 0;
      top: 0;
    }
  }
}
</style>
