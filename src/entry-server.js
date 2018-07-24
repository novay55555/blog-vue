import { createApp } from './app'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()

    router.push(context.url)

    Promise.all([
      store.dispatch('articles/saveArticleTypes'),
      store.dispatch('account/getAdmin'),
      store.dispatch('account/getSession', { headers: context.headers })
    ])
      .then(() => {
        router.onReady(() => {
          if (
            context.url.indexOf('/inside-world') !== -1 &&
            !store.state.account.isAdmin
          ) {
            reject(new Error('U R NOT ADMIN'))
          }

          const matchedComponents = router.getMatchedComponents()

          Promise.all(
            matchedComponents.map(component => {
              if (component.asyncData) {
                return component.asyncData({
                  store,
                  route: {
                    ...router.currentRoute,
                    query: context.query
                  },
                  ctx: context
                })
              }
            })
          )
            .then(() => {
              context.state = store.state
              resolve(app)
            })
            .catch(reject)
        }, reject)
      })
      .catch(reject)
  })
}
