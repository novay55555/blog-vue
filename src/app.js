import Vue from 'vue'
import App from './App.vue'
import * as Uiv from 'uiv'
import VueProgressBar from 'vue-progressbar'
import { createRouter } from './router/index'
import { createStore } from './store/index'

Vue.use(Uiv, { prefix: 'uiv' })
Vue.use(VueProgressBar, { thickness: '4px', color: '#42b983' })

export function createApp() {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return { app, router, store }
}
