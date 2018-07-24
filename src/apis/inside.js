import ajax from '../libs/ajax'
import md5 from 'blueimp-md5'

export const fetchUsers = (page = 1, options = {}) =>
  ajax.get(`/api/inside/users/${page}`, options)

export const fetchUsersByName = (name, page = 1) =>
  ajax.get(`/api/inside/users/search/${name}/${page}`)

export const fetchEditUser = (id, password, email) =>
  ajax.put(`/api/inside/user/edit`, { id, password: md5(password), email })

export const fetchDeleteUser = id =>
  ajax.delete(`/api/inside/user/delete/${id}`)

export const fetchUpdateBlog = updateData => {
  if (updateData.admin.password.trim()) {
    updateData.admin.password = md5(updateData.admin.password)
  } else {
    delete updateData.admin.password
  }
  return ajax.put(`/api/inside/blog`, updateData)
}

export const fetchAdmin = () => ajax.get(`/api/inside/admin`)

export const fetchUploadAdminAvatar = (id, avatar) =>
  ajax.put(`/api/user/avatar/${id}`, { avatar })
