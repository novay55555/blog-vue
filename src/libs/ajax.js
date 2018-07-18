import $ from 'jquery'
import BrowserChecker from './browser'

const browserChecker = BrowserChecker()

const SUCCESS_CODE = 1
const ERROR_MESSAGE = '服务器大姨妈, 请稍后再试 =. ='

let defaultOpts = {
  contentType: 'application/json; charset=utf-8',
  dataType: 'json',
  success: data => {
    if (data.code === SUCCESS_CODE) {
      Promise.resolve(data.content)
    } else {
      Promise.reject(new Error(data.msg))
    }
  },
  error: () => Promise.reject(new Error(ERROR_MESSAGE))
}

const get = (url, options = {}) =>
  new Promise(() =>
    $.ajax(
      $.extend(
        { url: browserChecker.isIE() ? `${url}?t=${Date.now()}` : url },
        defaultOpts,
        options
      )
    )
  )

const post = (url, data = {}, options = {}) =>
  new Promise(() =>
    $.ajax(
      $.extend(
        {
          url,
          method: 'POST',
          data: JSON.stringify(data)
        },
        defaultOpts,
        options
      )
    )
  )

const put = (url, data = {}, options = {}) =>
  new Promise(() =>
    $.ajax(
      $.extend(
        {
          url,
          method: 'PUT',
          data: JSON.stringify(data)
        },
        defaultOpts,
        options
      )
    )
  )

const del = (url, options = {}) =>
  new Promise(() => $.ajax($.extend({ url }, defaultOpts, options)))

const setDefault = options => $.extend(true, defaultOpts, options)

export default {
  get,
  post,
  put,
  delete: del,
  setDefault
}
