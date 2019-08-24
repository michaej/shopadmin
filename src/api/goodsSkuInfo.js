import request from '@/utils/request'

/**
 * 根据分类id 获取规格信息
 * @param category_id
 * @param params
 * @returns {Promise<any>}
 */
export function getCategorySkuList(category_id, params) {
    return request({
        url: `admin/goods/specs/categories/${category_id}/specs`,
        // url: `seller/goods/categories/${category_id}/specs`,
        method: 'get',
        loading: false,
        params
    })
}

/**
 * 保存商家自定义某分类的规格项
 * @param category_id
 * @param params
 * @returns {Promise<any>}
 */
export function saveCustomSkuItem(category_id, params) {
    return request({
        url: `admin/goods/specs/categories/${category_id}/specs`,
        // url: `seller/goods/categories/${category_id}/specs`,
        method: 'post',
        loading: false,
        data: params
    })
}

/**
 * 根据分类id 获取规格信息
 * @param category_id
 * @param params
 * @returns {Promise<any>}
 */
export function getActivityCategorySkuList(category_id, params) {
    return request({
        url: `admin/goods/specs/activity/categories/${category_id}/specs`,
        // url: `seller/goods/activity/categories/${category_id}/specs`,
        method: 'get',
        loading: false,
        params
    })
}

/**
 * 根据分类id 获取规格信息
 * @param category_id
 * @param params
 * @returns {Promise<any>}
 */
export function getGroupbuyCategorySkuList(category_id, params) {
  return request({
    url: `admin/goods/specs/groupbuy/categories/${category_id}/specs`,
    // url: `seller/goods/activity/categories/${category_id}/specs`,
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 保存商家自定义某分类的规格项
 * @param category_id
 * @param params
 * @returns {Promise<any>}
 */
export function saveActivityCustomSkuItem(category_id, params) {
    return request({
        url: `admin/goods/specs/activity/categories/${category_id}/specs`,
        // url: `seller/goods/activity/categories/${category_id}/specs`,
        method: 'post',
        loading: false,
        data: params
    })
}

/**
 * 保存商家自定义某分类的规格项
 * @param category_id
 * @param params
 * @returns {Promise<any>}
 */
export function saveGroupbuyCustomSkuItem(category_id, params) {
  return request({
    url: `admin/goods/specs/groupbuy/categories/${category_id}/specs`,
    method: 'post',
    loading: false,
    data: params
  })
}

/**
 * 保存商家自定义某规格的规格值
 * @param spec_id
 * @param params
 * @returns {Promise<any>}
 */
export function saveCustomSkuValue(spec_id, params) {
    return request({
        url: `/admin/goods/specs/specs/${spec_id}/values`,
        // url: `seller/goods/specs/${spec_id}/values`,
        method: 'post',
        loading: false,
        data: params
    })
}
