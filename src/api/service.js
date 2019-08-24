/**
 * 商品管理API
 */

import request from '@/utils/request'

/**
 * 获取服务列表
 * @param params
 */
export function getGoodsList(params) {
    return request({
        url: 'admin/server/manager/list',
        method: 'get',
        loading: false,
        params
    })
}

/**
 * 下架商品
 * @param goods_id 商品ID
 * @param reason 下架原因
 * @returns {*}
 */
export function underGoods(params) {
    return request({
        url: `/admin/server/manager/offline`,
        method: 'put',
        params
    })
}

/**
 * 上架商品
 * @param goods_id 商品ID
 * @returns {*}
 */
export function upGoods(goods_id) {
    return request({
        url: `admin/goods/${goods_id}/up`,
        method: 'put'
    })
}

/**
 * 获取待审核商品列表
 * @param params
 */
export function getAuditGoods(params) {
    params.is_auth = 0
    return request({
        url: `/admin/server/manager/list?status=1`,
        method: 'get',
        loading: false,
        params
    })
}

/**
 * 获取待审核商品列表
 * @param params
 */
// export function getManagerDetails(params) {
//     return request({
//         url: `/admin/server/manager/details`,
//         method: 'get',
//         loading: false,
//         params
//     })
// }

/**
 * 审核商品
 * @param goods_id
 * @param params
 * @returns {*}
 */
export function auditGoods(params) {
    return request({
        url: `/admin/server/manager/batchAuth`,
        method: 'put',
        params
    })
}

/**
 * 商品索引生成
 */
export function initSearchIndex() {
    return request({
        url: 'admin/goods/search',
        method: 'get'
    })
}

/**
 * 获取商品设置
 */
export function getGoodsSettings() {
    return request({
        url: 'admin/goods/settings',
        method: 'get'
    })
}

/**
 * 修改商品设置
 * @param params
 */
export function editGoodsSettings(params) {
    return request({
        url: 'admin/goods/settings',
        method: 'post',
        data: params
    })
}

/**
 * 获取商品详情
 * @param goods_id
 */
export function getInfo(goods_id) {
    return request({
        url: `admin/goods/getInfo/${goods_id}`,
        method: 'get'
    })
}

/**
 * 获取商品详情  隐藏loading
 * @param goods_id
 */
export function getGoodsInfo(params) {
    return request({
        url: `/admin/server/manager/details`,
        method: 'get',
        loading: false,
        params
    })
}

/**
 * 服务预览
 * @param goods_id
 */
export function getManagerDetails(params) {
    return request({
        url: `/admin/server/manager/details`,
        method: 'get',
        loading: false,
        params
    })
}

/**
 * 提交审核商品参数
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
 * 查询库存商品数据  查询商品sku（规格）信息
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function getGoodsStockList(ids, params) {
    return request({
        url: `admin/goods/${ids}/skus`,
        method: 'get',
        loading: false,
        params
    })
}


/**
 * 保存库存商品
 * @param goods_id
 * @param params
 * @returns {Promise<any>}
 */
export function reserveStockGoods(goods_id, params) {
    return request({
        url: `admin/goods/${goods_id}/quantity`,
        method: 'put',
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
export function getGoodData(ids, params) {
    return request({
        url: `admin/activity/goods/activitygoods/${ids}`,
        method: 'get',
        loading: false,
        params
    })
}

/**
 * 查询单个cm商品信息 商品列表 编辑
 * @param goods_id
 * @returns {Promise<any>}
 */
export function getCmInfo(goods_id) {
    return request({
        url: `admin/goods/cmi-setting/${goods_id}`,
        method: 'get',
        loading: false,
    })
}

/**
 * 修改单个cm商品信息 商品列表 编辑
 * @param goods_id
 * @returns {Promise<any>}
 */
export function setCmInfo(goods_id, params) {
    return request({
        url: `admin/goods/cmi-setting/${goods_id}`,
        method: 'put',
        loading: false,
        headers: { 'Content-Type': 'application/json' },
        data: params
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
        url: `admin/activity/goods/activitygoods/${id}`,
        method: 'put',
        loading: false,
        headers: { 'Content-Type': 'application/json' },
        data: params
    })
}


// /**
//  * 品牌列表 ids为categoryid  商品发布，获取所选分类关联的品牌信息
//  * @param ids
//  * @param params
//  * @returns {Promise<any>}
//  */
// export function getGoodsBrandList(ids, params) {
//     return request({
//         url: `seller/goods/category/${ids}/brands`,
//         method: 'get',
//         loading: false,
//         params
//     })
// }

export function getGoodsAudit(goods_id, params) {
    return request({
        url: `/admin/goods/${goods_id}/batch/auth`,
        // url: `/admin/activity/goods/auth/${goods_id}`,
        method: 'put',
        data: params,
        loading: false
    })
}

export function toExcel(params) {
    return request({
        url: `/admin/goods/import/goods-commission`,
        method: 'put',
        data: params,
        timeout: 25000,
        loading: false,
        headers: { 'Content-Type': 'application/json' },
    })
}