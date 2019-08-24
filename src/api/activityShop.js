/**
 * 店铺审核
 */

import request from '@/utils/request'

/**
 * 获取品牌分类列表
 * @param params
 */
export function getShopList(params) {
    return request({
        url: '/admin/activity/shop-check/list',
        method: 'get',
        params
    })
}

/**
 * 获取
 * @param params
 */
export function getShopDetail(params) {
    return request({
        url: '/admin/activity/shop-check/record',
        method: 'get',
        params
    })
}

/**
 * 获取店铺档次列表
 * @param params
 */
export function getGradeList(params) {
    return request({
        url: '/admin/activity/shop-grade',
        method: 'get',
        params,
        loading: false
    })
}

/**
 * 获取单个店铺信息
 * @param params
 */
export function getShopAuditInfo(params) {
    return request({
        url: '/admin/activity/shop-check/record',
        method: 'get',
        params,
        loading: false
    })
}

/**
 * 提交店铺审核
 * @param params
 */
export function postGradeList(params) {
    return request({
        url: '/admin/activity/shop-check/check',
        method: 'post',
        params,
        loading: false
    })
}


/**
 * 修改截止时间
 * @param params
 */
export function editTime(id, params) {
    return request({
        url: `/admin/activity/shop-check/update-time/${id}`,
        method: 'put',
        params,
        loading: false
    })
}