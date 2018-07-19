<template>
  <div class="main-page">
    <Asidebar :data="asidebarIcons">
      <!-- <ListGroup slot="glyphicon-folder-open"></ListGroup> -->
      <Search slot="glyphicon-search" class="feature-search"></Search>
      <!-- <ListGroup slot="glyphicon-send"></ListGroup> -->
    </Asidebar>
    <div class="container-fluid">
      <div class="row">
        <div class='col-lg-2 col-sm-3'>
          Author Component
        </div>
        <div class='col-lg-10 col-sm-9'>
          <router-view />
        </div>
      </div>
    </div>
    <!-- signin modal -->
    <!-- register modal -->
  </div>
</template>

<script>
import Asidebar from '../components/Asidebar.vue'
import ListGroup from '../components/ListGroup.vue'
import Search from '../components/SearchInput.vue'

export default {
  name: 'main-page',
  components: {
    Asidebar,
    ListGroup,
    Search
  },
  data() {
    return {
      asidebarIcons: [
        'glyphicon-folder-open',
        'glyphicon-search',
        'glyphicon-send',
        'glyphicon-th'
      ]
    }
  }
}
</script>

<style lang="scss">
.main-page {
  padding-top: 10px;
  padding-left: 75px;
  div[class*='col-lg-'] {
    float: right;
  }
}
@media (max-width: 767px) {
  .main-page {
    div[class*='col-lg-'] {
      float: none;
    }
    .col-lg-2 {
      min-height: 200px;
      color: #800080;
      background: linear-gradient(270deg, #b6fbff, #83a4d4);
    }
  }
}
</style>
