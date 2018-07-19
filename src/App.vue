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
* {
  margin: 0;
  padding: 0;
}

a:focus,
a:hover {
  text-decoration: none;
}

ul,
ol {
  list-style: none;
}

button {
  outline: none;
}

.btn.active.focus,
.btn.active:focus,
.btn.focus,
.btn:active.focus,
.btn:active:focus,
.btn:focus {
  outline: none;
}

html {
  height: 100%;
}

body {
  position: relative;
  padding-bottom: 125px;
  min-height: 100%;
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
  font-size: 16px;
}
</style>
