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
    const activated = matched.filter((component, i) => {
      return diffed || (diffed = prevMatched[i] !== component)
    })

    if (!activated.length) {
      return next()
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
