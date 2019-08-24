/**
 * 团购商品管理API
 */

import request from '@/utils/request'

/**
 * ------------------------------------------------------------------------------------------------------------------------------------
 * ----------------------------------------------------------  团购商品相关   -----------------------------------------------------------
 * ------------------------------------------------------------------------------------------------------------------------------------
 */

/**
 * 获取商品列表
 * @param params
 */
export function goodsList(params) {
  return request({
    url: '/admin/groupbuy/goods/list',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 上架团购商品 商品相关API-添加商品
 * @param params
 * @returns {Promise<any>}
 */
export function aboveGoods(params) {
  return request({
    url: '/admin/groupbuy/goods',
    method: 'post',
    data: params,
    headers: { 'Content-Type': 'application/json' }
  })
}


/**
 * 查询单个商品信息 商品列表 编辑
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function editGoods(id, params) {
  return request({
    url: `/admin/groupbuy/goods/${id}`,
    method: 'put',
    loading: false,
    headers: { 'Content-Type': 'application/json' },
    data: params
  })
}




/**
 * 正常商品 保存草稿 草稿商品相关API-添加商品
 * @param params
 * @returns {Promise<any>}
 */
export function saveDraft(params) {
  return request({
    url: `/admin/groupbuy/goods/draft`,
    method: 'post',
    data: params,
    headers: { 'Content-Type': 'application/json' }
  })
}

/**
 * 查询库存商品数据  查询商品sku（规格）信息
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function getGoodsStockList(ids, params) {
  return request({
    url: `/admin/groupbuy/goods/${ids}/skus`,
    method: 'get',
    loading: false,
    params
  })
}


/**
 * 获取商品详情  隐藏loading
 * @param goods_id
 */
export function getGoodsInfo(goods_id) {
  return request({
    url: `/admin/groupbuy/goods/preview/${goods_id}`,
    method: 'get',
    loading: false
  })
}

/**
 * 查询单个商品信息 商品列表 编辑
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function getGoodData(ids, params) {
  return request({
    url: `/admin/groupbuy/goods/${ids}`,
    method: 'get',
    loading: false,
    params
  })
}


/**
 * ------------------------------------------------------------------------------------------------------------------------------------
 * ----------------------------------------------------------  拼团列表相关   -----------------------------------------------------------
 * ------------------------------------------------------------------------------------------------------------------------------------
 */

/**
 * 拼团列表
 * @param params
 */
export function createList(params) {
  return request({
    url: '/admin/groupbuy/create',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 拼团明细
 * @param group_sn
 */
export function createInfo(group_sn) {
  return request({
    url: `/admin/groupbuy/create/${group_sn}`,
    method: 'get'
  })
}




