/**
 * 身份校验相关API
 */

import request from '@/utils/request'

/**
 * 获取身份校验列表
 * @param params
 */
export function getIdVerify(params) {
  return request({
    url: 'admin/settings/appcode',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 编辑身份校验
 * @param bean
 * @param params
 */
export function editVerify(params) {
  return request({
    url: '/admin/settings/vertify/idcard',
    method: 'put',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: params
  })
}

