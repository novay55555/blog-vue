import $ from 'jquery'

export const loadScript = url =>
  new Promise(resolve => {
    const script = document.createElement('script')
    script.src = url
    script.addEventListener('load', () => resolve())
    document.body.appendChild(script)
  })

export const loadScripts = urls => Promise.all(urls.map(url => loadScript(url)))

export const loadStylesheet = url =>
  new Promise(resolve => {
    const stylesheet = document.createElement('link')
    stylesheet.href = url
    stylesheet.rel = 'stylesheet'
    stylesheet.addEventListener('load', () => resolve())
    document.head.appendChild(stylesheet)
  })

export const loadStylesheets = urls =>
  Promise.all(urls.map(url => loadStylesheet(url)))

export const querySelectors = (selector, context = document) =>
  Array.prototype.slice.call(context.querySelectorAll(selector))

export const loadPlugin = function(pluginName) {
  const pluginMap = {
    cropper: new Promise(resolve => {
      if (typeof $.fn.cropper === 'undefined') {
        Promise.all([
          loadScript('/vendor/cropper/cropper.min.js'),
          loadStylesheet('/vendor/cropper/cropper.min.css')
        ]).then(() => resolve())
        return
      }
      resolve()
    }),
    highlightjs: new Promise(resolve => {
      if (!window.hasOwnProperty('hljs')) {
        Promise.all([
          loadScript('/vendor/highlightjs/highlight.js'),
          loadStylesheet('/vendor/highlightjs/monokai-sublime.css')
        ]).then(() => resolve())
        return
      }
      resolve()
    }),
    markdownEditor: new Promise(resolve => {
      if (typeof $.fn.markdown === 'undefined') {
        Promise.all(
          loadScripts(
            [
              '/vendor/markdown-editor/bootstrap-markdown.js',
              '/vendor/markdown-editor/jquery.hotkeys.js'
            ].concat(
              loadStylesheet(
                '/vendor/markdown-editor/bootstrap-markdown.min.css'
              )
            )
          )
        ).then(() => resolve())
      }
    })
  }
  const p = pluginMap[pluginName]
  if (!p)
    return Promise.reject(
      new Error(`No plugin named ${pluginName} defined in the map`)
    )
  return p
}

export function formatTime(fmt) {
  //author: meizz
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  }
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
  return fmt
}
