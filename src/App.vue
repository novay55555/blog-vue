<template>
  <div id="app">
    <router-view></router-view>
    <vue-progress-bar />
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
html {
  height: 100%;
}

body {
  position: relative;
  padding-bottom: 125px;
  min-height: 100%;
  font-size: 16px;
}

main {
  padding-top: 10px;
  padding-left: 75px;
}

a {
  transition: color 0.25s ease-in-out, border-color 0.25s,
    background 0.25s ease-in-out;
}

button {
  transition: color 0.25s ease-in-out, border-color 0.25s,
    background 0.25s ease-in-out;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
