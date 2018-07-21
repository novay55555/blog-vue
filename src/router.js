import Vue from 'vue'
import Router from 'vue-router'
import MainPage from './layouts/MainPage.vue'
import Articles from './views/Articles.vue'
import OneArticle from './views/Article.vue'
import NotFound from './views/404.vue'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'home',
        redirect: '/articles/1'
      },
      {
        path: '/articles',
        name: 'articles',
        component: MainPage,
        children: [
          {
            path: ':page',
            name: 'articles-lists',
            component: Articles
          }
        ]
      },
      {
        path: '/article',
        name: 'oneArticle',
        component: MainPage,
        children: [
          {
            path: ':id',
            name: 'article-content',
            component: OneArticle
          }
        ]
      },
      {
        path: '*',
        name: '404',
        component: NotFound
      }
    ]
  })
}
