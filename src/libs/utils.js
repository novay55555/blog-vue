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
    cropper: () =>
      new Promise(resolve => {
        if (typeof $.fn.cropper === 'undefined') {
          Promise.all([
            loadScript('/vendor/cropper/cropper.min.js'),
            loadStylesheet('/vendor/cropper/cropper.min.css')
          ]).then(() => resolve())
          return
        }
        resolve()
      }),
    highlightjs: () =>
      new Promise(resolve => {
        if (!window.hasOwnProperty('hljs')) {
          Promise.all([
            loadScript('/vendor/highlightjs/highlight.min.js'),
            loadStylesheet('/vendor/highlightjs/monokai-sublime.css')
          ]).then(() => resolve())
          return
        }
        resolve()
      }),
    markdownEditor: () =>
      new Promise(resolve => {
        if (typeof $.fn.markdown === 'undefined') {
          Promise.all(
            loadScripts(
              [
                '/vendor/markdown-editor/bootstrap-markdown.min.js',
                '/vendor/markdown-editor/jquery.hotkeys.min.js'
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
  const func = pluginMap[pluginName]
  if (!func)
    return Promise.reject(
      new Error(`No plugin named ${pluginName} defined in the map`)
    )
  return func()
}

/**
 * 格式化时间
 *
 * @param  {number} timestamp 时间戳
 * @param  {string} format 格式
 * @return {string}        格式化过后的时间
 */
export const formatDate = function(timestamp, format) {
  const source = new Date(timestamp)
  const o = {
    'M+': source.getMonth() + 1, // 月份
    'd+': source.getDate(), // 日
    'H+': source.getHours(), // 小时
    'm+': source.getMinutes(), // 分
    's+': source.getSeconds(), // 秒
    'q+': Math.floor((source.getMonth() + 3) / 3), // 季度
    'f+': source.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (source.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return format
}

/**
 * 仿jquery迭代器
 * 通常用于可中断的迭代, 如不需中断, 请用js其他的迭代方法
 *
 * @param {array, object} data 遍历的对象
 * @param {function} callback 回调函数
 * @param {any} scope 回调函数执行的context
 */
export const each = function(data, callback, scope) {
  if (typeof data === 'object' && data.constructor === Array) {
    for (let i = 0, l = data.length; i < l; i++) {
      const r = callback.call(scope, data[i], i, data)
      if (r === false) break
    }
  } else if (typeof data === 'object' && data.constructor === Object) {
    for (let key in data) {
      const r = callback.call(scope, data[key], key, data)
      if (r === false) break
    }
  }
}

export function ManualError(message) {
  this.name = 'manualError'
  this.message = message
  this.stack = new Error().stack
}

ManualError.prototype = Object.create(Error.prototype)
ManualError.prototype.constructor = ManualError

export const mockArray = (l = 10) => Array.apply(null, Array(l))
