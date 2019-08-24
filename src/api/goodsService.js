/**
 * 商品服务API
 */

import request from '@/utils/request'

/**
 * 获取商品服务列表
 * @param params
 */
export function getServeList(params) {
  return request({
    url: '/admin/goods/mallServices/getMallServiceLists',
    method: 'get'
  })
}

/**
 * 新增商品服务
 */
export function addServeList(params) {
  return request({
    url: `/admin/goods/mallServices/addMallService`,
    method: 'post',
    data: params
  })
}

/**
 * 修改商品服务
 */
export function revampServeList(params) {
  return request({
    url: `/admin/goods/mallServices/modifyMallService`,
    method: 'post',
    data: params
  })
}

/**
 * 删除商品服务
 */
export function deleteServeList(serve_id) {
  return request({
    url: `/admin/goods/mallServices/deleteMallService?mall_service_id=${serve_id}`,
    method: 'get'
  })
}

/**
 * 获取分类标签列表
 * @param params
 */
export function getCategoryList(params) {
  return request({
    url: '/admin/goods/categories/label/list',
    method: 'get'
  })
}

/**
 * 获取服务分类标签列表
 * @param params
 */
export function getServiceList(params) {
  return request({
    url: '/admin/server/label/list',
    method: 'get'
  })
}

/**
 * 新增分类标签
 */
export function addTagLabel(params) {
  return request({
    url: `/admin/server/label/add`,
    method: 'post',
    data: params
  })
}


/**
 * 删除分类标签
 */
export function deleteTagList(params) {
  return request({
    url: `/admin/server/label/delete`,
    method: 'delete',
    params
  })
}

/**
 * 修改商品服务
 */
export function updateTagList(params) {
  return request({
    url: `/admin/server/label/update`,
    method: 'put',
    data: params
  })
}

/**
 * 获取店铺分类列表
 * @param params
 */
export function getShopsCategorys() {
  return request({
    url: '/admin/shops/categorys',
    method: 'get'
  })
}

/**
 * 删除店铺分类
 */
export function deleteShopsCategorys(id) {
  return request({
    url: `/admin/shops/categorys/${id}`,
    method: 'delete'
  })
}

/**
 * 新增店铺分类
 */
export function addShopsCategorys(params) {
  return request({
    url: `/admin/shops/categorys`,
    method: 'post',
    data: params
  })
}

/**
 * 修改店铺分类
 */
export function updateShopsCategorys(id, params) {
  return request({
    url: `admin/shops/categorys/${id}`,
    method: 'put',
    data: params
  })
}

/**
 * 获取店主身份列表
 * @param params
 */
export function getShopsOwnerIdentity() {
  return request({
    url: '/admin/shops/ownerIdentity',
    method: 'get'
  })
}

/**
 * 删除店主身份
 */
export function deleteShopsOwnerIdentity(id) {
  return request({
    url: `/admin/shops/ownerIdentity/${id}`,
    method: 'delete',
    loading: true
  })
}

/**
 * 新增店主身份
 */
export function addShopsOwnerIdentity(params) {
  return request({
    url: `/admin/shops/ownerIdentity`,
    method: 'post',
    data: params
  })
}

/**
 * 修改店主身份
 */
export function updateShopsOwnerIdentity(id, params) {
  return request({
    url: `/admin/shops/ownerIdentity/${id}`,
    method: 'put',
    data: params
  })
}