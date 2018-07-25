import Vue from 'vue'
import Router from 'vue-router'
import Articles from '../views/Articles.vue'
import Article from '../views/Article.vue'
import ArticleSearch from '../views/ArticleSearch.vue'
import InsideArticles from '../views/InsideArticles.vue'
import InsideUsers from '../views/InsideUsers.vue'
import InsideAdmin from '../views/InsideAdmin.vue'
import NotFound from '../views/404.vue'

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
        path: '/articles/:page',
        name: 'articles',
        component: Articles
      },
      {
        path: '/article/:id',
        name: 'oneArticle',
        component: Article
      },
      {
        path: '/search',
        name: 'article-search',
        component: ArticleSearch
      },
      {
        path: '/inside-world/articles',
        name: 'inside-articles',
        component: InsideArticles
      },
      {
        path: '/inside-world/users',
        name: 'inside-users',
        component: InsideUsers
      },
      {
        path: '/inside-world/admin',
        name: 'inside-admin',
        component: InsideAdmin
      },
      {
        path: '*',
        name: '404',
        component: NotFound
      }
    ],
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }
  })
}
