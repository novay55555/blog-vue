import axios from 'axios'
import BrowserChecker from './browser'
import { ManualError } from './utils'

const browserChecker = BrowserChecker()

const SUCCESS_CODE = 1
const ERROR_MESSAGE = '服务器大姨妈, 请稍后再试 =. ='
const isProd = process.env.NODE_ENV === 'production'

const _request = function() {
  const { before, success, fail } = defaults
  let args = [...arguments]
  const type = args.shift()

  before && before.call(null, args)

  return axios[type]
    .apply(null, args)
    .then(res => success(res.data))
    .catch(err => fail(err))
}

const _mergeAxiosOptions = options => Object.assign({}, defaults.axios, options)

let defaults = {
  axios: {
    timeout: 10000
  },
  before: args => {
    if (typeof window === 'undefined') {
      args[0] = `http://${require('ip').address()}:${isProd ? 3002 : 3001}${
        args[0]
      }`
    }

    return args
  },
  success: data => {
    if (data.code === SUCCESS_CODE) {
      return data.content
    } else {
      return Promise.reject(new ManualError(data.msg))
    }
  },
  fail: err => {
    if (err.name === 'manualError') {
      return Promise.reject(new Error(err.message))
    }

    return Promise.reject(new Error(ERROR_MESSAGE))
  }
}

/**
 * get 请求
 *
 * @param {string} url 请求的url
 * @param {object} options axios配置项, 兼容data键值
 * @return {promise} Promise对象
 */
const get = (url, options = {}) => {
  let o = _mergeAxiosOptions(options)
  o.params = o.params || o.data || {}
  browserChecker.isIE() && Object.assign(o.params, { t: Date.now() })
  return _request('get', url, o)
}

/**
 * post 请求
 *
 * @param {string} url 请求的url
 * @param {object} data body数据
 * @param {object} options axios配置项
 * @return {promise} Promise对象
 */
const post = (url, data = {}, options = {}) => {
  const o = _mergeAxiosOptions(options)
  return _request('post', url, data, o)
}

/**
 * put 请求
 *
 * @param {string} url 请求的url
 * @param {object} data body数据
 * @param {object} options axios配置项
 * @return {promise} Promise对象
 */
const put = (url, data = {}, options = {}) => {
  const o = _mergeAxiosOptions(options)
  return _request('put', url, data, o)
}

/**
 * delete 请求
 *
 * @param {string} url 请求的url
 * @param {object} options axios配置项,
 * @return {promise} Promise对象
 */
const del = (url, options = {}) => {
  const o = _mergeAxiosOptions(options)
  return _request('delete', url, o)
}

/**
 * 设置请求的一些默认行为
 *
 * @param {object} options
 * @param {object} options.axios 请求库axios的配置
 * @param {function} options.before 请求前针对参数的处理
 * @param {function} options.success 请求成功针对后端返回数据结构的处理
 * @param {function} options.fail 请求失败或后端异常数据结构的处理
 */
const setDefault = options => {
  Object.assign(defaults, options)
}

export default {
  get,
  post,
  put,
  delete: del,
  setDefault
}
