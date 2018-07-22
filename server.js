const path = require('path')
const fs = require('fs')
const Koa = require('koa')
const Router = require('koa-router')
const koaStatic = require('koa-static')
const koaMount = require('koa-mount')
const bodyParser = require('koa-bodyparser')
const LRU = require('lru-cache')
const ip = require('ip')
const axios = require('axios')
const { createBundleRenderer } = require('vue-server-renderer')
const ssrDevServer = require('./ssr-dev-server')

const isProd = process.env.NODE_ENV === 'production'
const PORT = 3001
const API_PORT = 3000
const server = new Koa()
const router = new Router()
const staticFolders = ['js', 'css', 'img', 'vendor', 'fonts']

let renderer
let ssrDevServerReady

if (isProd) {
  renderer = initRenderder()
} else {
  ssrDevServerReady = ssrDevServer.init(
    server,
    path.join(__dirname, 'src/index.template.html'),
    (bundle, options) => {
      renderer = createRenderer(bundle, options)
    }
  )
}

staticFolders.forEach(folder => {
  server.use(
    koaMount(`/${folder}`, koaStatic(path.join(__dirname, 'dist', folder)))
  )
})

server.use(bodyParser())

server.use(proxyApi)

router.get('*', async ctx => {
  if (!isProd) {
    await ssrDevServerReady
  }

  const result = await render(ctx)
  ctx.body = result
})

server.use(router.routes()).use(router.allowedMethods())

server.listen(PORT, err => {
  if (err) console.log(err.message)
  console.log(`Listen on port: ${PORT}`)
})

function render(ctx) {
  ctx.set('Content-Type', 'text/html')

  const context = {
    title: 'Hello, SSR!',
    url: ctx.path,
    query: ctx.query
  }

  return renderer.renderToString(context)
}

function createRenderer(bundle, options = {}) {
  return createBundleRenderer(
    bundle,
    Object.assign(options, {
      runInNewContext: false,
      cache: LRU({
        max: 10000
      })
    })
  )
}

function initRenderder() {
  const bundle = require('./dist/vue-ssr-server-bundle.json')
  const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  const template = fs.readFileSync(
    path.join(__dirname, 'src/index.template.html'),
    'utf-8'
  )
  const renderer = createRenderer(bundle, {
    template,
    clientManifest
  })

  return renderer
}

async function proxyApi(ctx, next) {
  if (ctx.url.indexOf('/api') !== 0) return next()
  const uri = `http://${ip.address()}:${API_PORT}${ctx.url}`
  const method = ctx.method.toLowerCase()
  const body = ctx.request.body
  const options = {}
  const args = Object.keys(body).length ? [uri, body, options] : [uri, options]
  try {
    const res = await axios[method].apply(null, args)
    ctx.body = res.data
  } catch (e) {
    throw e
  }
}
