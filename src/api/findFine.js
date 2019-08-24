/**
 * 好物优享API
 */

import request from '@/utils/request'

/**
 * 获取商品列表
 * @param params
 */
export function getGoodsList(params) {
    return request({
        url: '/admin/activity/beauty/list',
        method: 'get',
        loading: false,
        params
    })
}


/**
 * 删除好物优享
 */
export function deleteBestGoods(params) {
    return request({
        url: `/admin/activity/bestgoods/deletebestgoods`,
        method: 'delete',
        params
    })
}

/**
 * 修改优选商品的排序
 * @param params
 */
export function updatesort(params) {
    return request({
        url: '/admin/activity/bestgoods/updatesort',
        method: 'post',
        loading: false,
        params
    })
}

/**
 * 获取优选商品的详情
 * @param params
 */
// export function getGoodsDetail(params, goods_id) {
//     return request({
//         url: `/admin/activity/bestgoods/${goods_id}`,
//         method: 'get',
//         loading: false,
//         params
//     })
// }

export function getGoodsDetail(params, goods_id) {
    return request({
        url: `/admin/activity/goods/${goods_id}`,
        method: 'get',
        loading: false,
        params
    })
}