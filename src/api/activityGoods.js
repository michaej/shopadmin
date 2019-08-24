/**
 * 梦想官商品管理API
 */

import request from '@/utils/request'

/**
 * 获取商品列表
 * @param params
 */
export function getActivityGoodsList(params) {
    return request({
        url: '/admin/activity/goods/search',
        method: 'get',
        loading: false,
        params
    })
}


/**
 * 获取商品设置
 * @param goods_id
 */
export function getInfo(goods_id) {
    return request({
        url: `admin/goods/getInfo/${goods_id}`,
        method: 'get'
    })
}


/**
 * 提交设置商品参数
 * @param params
 */
export function submitGoodsSetting(params) {
    return request({
        url: 'admin/goods/edit',
        method: 'put',
        data: params
    })
}


/**
 * 梦想官商品审核
 * @param params
 */
export function submitAuditGoods(pass, goods_id, params) {
    return request({
        url: `/admin/activity/goods/${pass}/auth/${goods_id}`,
        method: 'put',
        data: params
    })
}

/**
 * 梦想官商品批量
 * @param params
 */
export function submitAuditGoodsBatch(pass, goods_ids, params) {
    return request({
        url: `/admin/activity/goods/batch/${pass}/auth/${goods_ids}`,
        method: 'put',
        data: params
    })
}

/**
 * 梦想官获取商品审核信息
 * @param params
 */
export function getGoodsAuditDetail(goods_id, params) {
    return request({
        url: `/admin/activity/goods/auth/${goods_id}`,
        method: 'get',
        data: params,
        loading: false
    })
}

/**
 * setTime
 * @param params
 */
export function setTime(goods_id, params) {
    return request({
        url: `/admin/activity/goods/updatetime/${goods_id}`,
        method: 'put',
        data: params
    })
}