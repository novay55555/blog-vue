<template>
  <div class="main-page">
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
export default {
  name: 'main-page'
}
</script>

<style lang="scss">
.main-page {
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
