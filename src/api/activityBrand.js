/**
 * 品牌API
 */

import request from '@/utils/request'

/**
 * 获取品牌分类列表
 * @param params
 */
export function getBrandList(params) {
  return request({
    url: '/admin/activity/brand',
    method: 'get',
    params
  })
}

/**
 * 获取品牌信息
 * @param params
 */
export function getBrandInfo(id,params) {
  return request({
    url: `/admin/activity/brand/${id}`,
    method: 'get',
    params
  })
}

/**
 * 审核活动品牌
 * @param params
 */
export function auditBrand(pass,brand_id,params) {
  return request({
    url: `/admin/activity/brand/${pass}/auth/${brand_id}`,
    method: 'put',
    params
  })
}

/**
 * 批量审核活动品牌
 * @param params
 */
export function batchAuditBrand(pass,brand_ids,params) {
  return request({
    url: `/admin/activity/brand/batch/${pass}/auth/${brand_ids}`,
    method: 'put',
    params
  })
}

