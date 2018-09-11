import { createApp } from './app'
import 'bootstrap/dist/css/bootstrap.min.css'

const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)

    let diffed = false
    let activated = matched.filter((component, i) => {
      return diffed || (diffed = prevMatched[i] !== component)
    })

    // 考虑到一种情况: 路由组件相同而路由参数不同, 且数据请求依赖路由参数
    // 这种情况下只变换路由参数也要重新请求数据
    // 原则上, 路由切换的数据请求, 都应该通过路由守卫来处理
    if (!activated.length && to.fullPath === from.fullPath) {
      return next()
    } else if (!activated.length) {
      activated = matched
    }

    let needLoading = false

    Promise.all(
      activated.map((component, i) => {
        let p = Promise.resolve()
        if (component.asyncData) {
          needLoading = true
          p = component.asyncData({
            store,
            route: to
          })
        }
        if (i === activated.length - 1) {
          needLoading && app.$Progress.start()
        }
        return p
      })
    )
      .then(() => {
        app.$Progress.finish()
        next()
      })
      .catch(() => {
        app.$Progress.finish()
        app.$uiv_notify({
          type: 'danger',
          content: '服务器大姨妈, 请稍候再试'
        })
      })
  })

  app.$mount('#app')
})
