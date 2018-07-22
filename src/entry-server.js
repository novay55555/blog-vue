import { createApp } from './app'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()

    router.push(context.url)

    Promise.all([
      store.dispatch('articles/saveArticleTypes'),
      store.dispatch('account/getAdmin')
    ])
      .then(() => {
        router.onReady(() => {
          const matchedComponents = router.getMatchedComponents()

          Promise.all(
            matchedComponents.map(component => {
              if (component.asyncData) {
                return component.asyncData({
                  store,
                  route: {
                    ...router.currentRoute,
                    query: context.query
                  }
                })
              }
            })
          ).then(() => {
            context.state = store.state
            resolve(app)
          })
        }, reject)
      })
      .catch(reject)
  })
}
