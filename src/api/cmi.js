/**
 * C米商城相关API
 */

import request from '@/utils/request'

/**
 * 获取C米商城详情
 * @param params
 * @returns {Promise<any>}
 */
export function getShopList() {
  return request({
    url: 'admin/cmi/proportion',
    method: 'get'
  })
}

/**
 * 修改按比例设置
 * @param params
 */
export function editCmiSetting(params) {
  return request({
    url: `admin/cmi/proportion/`,
    method: 'put',
    data: params
  })
}

/**
 * 修改单个C米比例
 * @param params cmi_proportion and goods_id
 */
export function editBygoodsIdAndCmi(params) {
  return request({
    url: `admin/cmi/goods`,
    method: 'put',
    data: params
  })
}

/**
 * 获取单个C米比例
 * @param params cmi_proportion and goods_id
 */
export function getSingleCmi(goods_id) {
  return request({
    url: `admin/cmi/goods?goods_id=${goods_id}`,
    method: 'get'
  })
}

/**
 * 获取分类C米单个详情
 * @param params cmi_proportion and goods_id
 */
export function getCategorySingleCmi(category_id) {
  return request({
    url: `admin/cmi/category?goods_id=${category_id}`,
    method: 'get'
  })
}

/**
 * 修改分类单个C米比例
 * @param params cmi_proportion and goods_id
 */
export function editByCategoryIdAndCmi(params) {
  return request({
    url: `admin/cmi/category`,
    method: 'put',
    data: params
  })
}


/**
 * 获取C米设置
 * @param params
 * @returns {Promise<any>}
 */
export function getCmiPerSetting() {
  return request({
    url: '/admin/cmi/get',
    method: 'get'
  })
}

/**
 * 修改C米设置
 * @param params
 */
export function editCmiPerSetting(params) {
  return request({
    url: `/admin/cmi/setting`,
    method: 'put',
    data: params
  })
}
