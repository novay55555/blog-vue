import Vue from 'vue'
import Router from 'vue-router'
import MainPage from './layouts/MainPage.vue'
import HelloWorld from './components/HelloWorld.vue'
import Reposition from './views/Reposition.vue'
import NotFound from './views/404.vue'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'home',
        redirect: '/articles'
      },
      {
        path: '/helloworld',
        name: 'helloworld',
        component: HelloWorld
      },
      {
        path: '/articles',
        name: 'articles',
        component: MainPage,
        children: [
          {
            path: ':page',
            name: 'article-lists',
            component: HelloWorld
          }
        ]
      },
      {
        path: '/repo/:type',
        name: 'repo',
        component: Reposition
      },
      {
        path: '*',
        name: '404',
        component: NotFound
      }
    ]
  })
}
