/**
 * 品牌分类API
 */

import request from '@/utils/request'

/**
 * 获取品牌分类列表
 * @param params
 */
export function getClassifyList(params) {
    return request({
        url: '/admin/activity/label/list',
        method: 'get'
    })
}

/**
 * 新增品牌分类服务
 */
export function addClassifyList(params) {
    return request({
        url: `/admin/activity/label`,
        method: 'put',
        data: params
    })
}

/**
 * 修改品牌分类
 */
export function revampGoodsClassifyList(params) {
    return request({
        url: `/admin/activity/label`,
        method: 'post',
        data: params
    })
}

/**
 * 删除品牌分类
 */
export function deleteGoodsClassify(params) {
    return request({
        url: `/admin/activity/label`,
        method: 'delete',
        params
    })
}


/**
 * 删除品牌分类
 */
export function moveCategory(params) {
    return request({
        url: `/admin/activity/label/movesort`,
        method: 'post',
        params
    })
}