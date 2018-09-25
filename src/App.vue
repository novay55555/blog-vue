<template>
  <div id="app">
    <router-view/>
    <vue-progress-bar />
    <Footer/>
  </div>
</template>

<script>
import { disableScrollbarPostion } from './libs/utils.js'
import Footer from './components/Footer.vue'

disableScrollbarPostion()

export default {
  name: 'App',
  components: {
    Footer
  }
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

@media (min-width: 1024px) {
  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 10px;
  }
  ::-webkit-scrollbar-button {
    display: none;
  }
  ::-webkit-scrollbar-track {
    background-color: #fff;
  }
  ::-webkit-scrollbar-thumb {
    min-height: 48px;
    background-color: #d2d2d2;
    border: 3px solid #fff;
    border-radius: 10px;
    background-clip: padding-box;
  }
}

#app {
  font-size: 16px;
}

.alert {
  z-index: 99999;
}
</style>
