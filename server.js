const path = require('path')
const fs = require('fs')
const Koa = require('koa')
const Router = require('koa-router')
const koaStatic = require('koa-static')
const koaMount = require('koa-mount')
const koaFavicon = require('koa-favicon')
const bodyParser = require('koa-bodyparser')
const LRU = require('lru-cache')
const ip = require('ip')
const axios = require('axios')
const { createBundleRenderer } = require('vue-server-renderer')
const ssrDevServer = require('./ssr-dev-server')

const isProd = process.env.NODE_ENV === 'production'
const PORT = isProd ? 3002 : 3001
const API_PORT = 3000
const server = new Koa()
const router = new Router()
const staticFolders = ['js', 'css', 'img', 'vendor', 'fonts']
const pageCache = LRU({
  maxAge: getLruMaxAge()
})

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

server.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || 500
    ctx.body = err.message
    ctx.app.emit('error', err, ctx)
  }
})

staticFolders.forEach(folder => {
  server.use(
    koaMount(`/${folder}`, koaStatic(path.join(__dirname, 'dist', folder)))
  )
})

server.use(koaFavicon(path.join(__dirname, 'dist/favicon.ico')))

server.use(bodyParser())

server.use(proxyApi)

router.get('*', async ctx => {
  ctx.set('Content-Type', 'text/html')

  if (!isProd) {
    await ssrDevServerReady
  }

  if (ctx.path === '/robots.txt') {
    ctx.body = fs.readFileSync(path.join(__dirname, 'dist/robots.txt'))
    return
  }

  let hit = pageCache.get(ctx.href)

  if (!hit) {
    hit = await render(ctx)
  }

  ctx.body = hit
})

server.use(router.routes()).use(router.allowedMethods())

server.listen(PORT, err => {
  if (err) return console.log(err.message)
  console.log(`Listen on port: ${PORT}`)
})

function render(ctx) {
  const context = {
    title: '艾酱的理想鄉',
    url: ctx.path,
    query: ctx.query,
    headers: {
      Cookie: ctx.get('Cookie')
    }
  }

  return renderer.renderToString(context).then(result => {
    pageCache.set(ctx.href, result)

    return Promise.resolve(result)
  })
}

function createRenderer(bundle, options = {}) {
  return createBundleRenderer(
    bundle,
    Object.assign(options, {
      inject: false,
      runInNewContext: false,
      cache: LRU({
        max: isProd ? 1000 : 0
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

  clientManifest.all = clientManifest.all.filter(el => !/^vendor/.test(el))
  clientManifest.async = []

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
  const options = {
    headers: {
      Cookie: ctx.get('Cookie')
    }
  }
  const args = Object.keys(body).length ? [uri, body, options] : [uri, options]

  try {
    const res = await axios[method].apply(null, args)
    Object.keys(res.headers).forEach(key => {
      ctx.set(key, res.headers[key])
    })
    ctx.body = res.data
  } catch (e) {
    throw e
  }
}

function getLruMaxAge(prodMaxAge = 7777, devMaxAge = 10) {
  return isProd ? prodMaxAge : devMaxAge
}
