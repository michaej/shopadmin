/**
 * 商品分类API
 */

import request from '@/utils/request'
import { randomBytes } from 'crypto';
import { stringify } from 'querystring';

/**
 * 获取商品分类列表
 * @param params
 */
export function getClassifyList(params) {
    return request({
        url: '/admin/activity/categories/list',
        method: 'get'
    })
}

/**
 * 新增商品分类服务
 */
export function addClassifyList(params) {
    return request({
        url: `/admin/activity/categories`,
        method: 'put',
        data: params
    })
}

/**
 * 修改商品分类
 */
export function revampGoodsClassifyList(params) {
    return request({
        url: `/admin/activity/categories`,
        method: 'post',
        data: params
    })
}

/**
 * 删除商品分类
 */
export function deleteGoodsClassify(params) {
    return request({
        url: `/admin/activity/categories`,
        method: 'delete',
        params
    })
}


/**
 * 移动商品分类
 */
export function move(params) {
    return request({
        url: `/admin/activity/categories/movesort`,
        method: 'post',
        params
    })
}