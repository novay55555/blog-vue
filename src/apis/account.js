import ajax from '../libs/ajax'
import md5 from 'blueimp-md5'

export const fetchSignin = (username, password) =>
  ajax.post('/api/login', { name: username, password: md5(password) })

export const fetchRegister = (username, password, email) =>
  ajax.post('/api/register', { name: username, password: md5(password), email })

export const fetchSignout = () => ajax.get('/api/signout')

export const fetchSession = options => ajax.get('/api/checkout', options)

export const fetchAdmin = () => ajax.get('/api/admin')
