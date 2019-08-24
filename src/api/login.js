import request from '@/utils/request'
import Storage from '@/utils/storage'
import md5 from 'js-md5'

/**
 * 登录
 * @param params
 * @returns {*}
 */
export function login(params) {
  params.se = md5(params.se)
  return request({
    url: '/token/app',
    method: 'post',
    data:params
  })
}

/**
 * 退出账户
 * @returns {*}
 */
export function logout() {
  return request({
    url: `admin/systems/admin-users/logout?uid=${Storage.getItem('admin_uid')}`,
    method: 'post'
  })
}

/**
 * 获取用户角色权限
 * @param role_id
 * @returns {*}
 */
export function getUserRolesPermissions(role_id) {
  return request({
    url: `admin/systems/roles/${role_id}/checked`,
    method: 'get'
  })
}
