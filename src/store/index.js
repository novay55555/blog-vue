import Vue from 'vue'
import Vuex from 'vuex'
import ArticleModule from './modules/articles'

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    modules: {
      articles: ArticleModule
    }
  })
}
