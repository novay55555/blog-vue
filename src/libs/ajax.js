import axios from 'axios'
import BrowserChecker from './browser'
import { ManualError } from './utils'

const browserChecker = BrowserChecker()

const SUCCESS_CODE = 1
const ERROR_MESSAGE = '服务器大姨妈, 请稍后再试 =. ='

const request = function() {
  let args = Array.prototype.slice.call(arguments)
  const type = args.shift()
  const opts = args[args.length - 1]
  if (typeof window === 'undefined') {
    args[0] = `http://${require('ip').address()}:${3001}${args[0]}`
  }
  return axios[type]
    .apply(null, args)
    .then(res => opts.success(res.data))
    .catch(err => {
      if (err.name === 'manualError') {
        return Promise.reject(new Error(err.message))
      }
      return Promise.reject(new Error(ERROR_MESSAGE))
    })
}

let defaultOpts = {
  timeout: 10000,
  success: data => {
    if (data.code === SUCCESS_CODE) {
      return data.content
    } else {
      return Promise.reject(new ManualError(data.msg))
    }
  }
}

/**
 * get 请求
 *
 * @param {string} url 请求的url
 * @param {object} options axios配置项, 兼容data键值, 另外如果需要改变接口成功的回调函数, 可以通过success(data)来改变
 * @return {promise} Promise对象
 */
const get = (url, options = {}) => {
  let o = Object.assign({}, defaultOpts, options)
  o.params = o.params || o.data || {}
  browserChecker.isIE() && Object.assign(o.params, { t: Date.now() })
  return request('get', url, o)
}

/**
 * post 请求
 *
 * @param {string} url 请求的url
 * @param {object} data body数据
 * @param {object} options axios配置项, 另外如果需要改变接口成功的回调函数, 可以通过success(data)来改变
 * @return {promise} Promise对象
 */
const post = (url, data, options = {}) => {
  const o = Object.assign({}, defaultOpts, options)
  return request('post', url, data, o)
}

/**
 * put 请求
 *
 * @param {string} url 请求的url
 * @param {object} data body数据
 * @param {object} options axios配置项, 另外如果需要改变接口成功的回调函数, 可以通过success(data)来改变
 * @return {promise} Promise对象
 */
const put = (url, data, options = {}) => {
  const o = Object.assign({}, defaultOpts, options)
  return request('put', url, data, o)
}

/**
 * delete 请求
 *
 * @param {string} url 请求的url
 * @param {object} options axios配置项, 另外如果需要改变接口成功的回调函数, 可以通过success(data)来改变
 * @return {promise} Promise对象
 */
const del = (url, options = {}) => {
  const o = Object.assign({}, defaultOpts, options)
  return request('delete', url, o)
}

const setDefault = options => {
  Object.assign(defaultOpts, options)
}

export default {
  get,
  post,
  put,
  delete: del,
  setDefault
}
