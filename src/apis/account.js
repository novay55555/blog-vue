import ajax from '../libs/ajax'
import md5 from 'blueimp-md5'

export const fetchSignin = (username, password, captcha) =>
  ajax.post('/api/login', { name: username, password: md5(password), captcha })

export const fetchRegister = (username, password, email, captcha) =>
  ajax.post('/api/register', {
    name: username,
    password: md5(password),
    email,
    captcha
  })

export const fetchSignout = () => ajax.get('/api/signout')

export const fetchSession = options => ajax.get('/api/checkout', options)

export const fetchAdmin = () => ajax.get('/api/admin')

export const fetchCaptcha = (data = {}) => ajax.get('/api/captcha', { data })
