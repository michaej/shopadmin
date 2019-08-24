import request from '@/utils/request'

/**
 * 获取店铺分组列表
 * @param params
 * @returns {Promise<any>}
 */
export function getGoodsCategoryList() {
  return request({
    url: 'seller/shops/cats',
    method: 'get',
    loading: false
  })
}

/**
 * 分级查询商品分类列表
 * @param params
 * @returns {Promise<any>}
 */
export function getGoodsCatList(parent_id,params) {
  return request({
    url: `admin/goods/categories/${parent_id}/children`,
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 获取问题详情
 * @param params
 * @returns {Promise<any>}
 */
export function getCustomList(params) {
  return request({
    url: `/admin/question/custom/detail`,
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 获取问题详情
 * @param params
 * @returns {Promise<any>}
 */
export function getCustomReply(params) {
  return request({
    url: `/admin/question/custom/reply`,
    method: 'put',
    loading: false,
    params
  })
}


/**
 * 删除 商品分组
 * @param params
 * @returns {Promise<any>}
 * @constructor
 */
export function deleteGoodsCategory(params) {
  const ids = params.toString()
  return request({
    url: `seller/shops/cats/${ids}`,
    method: 'delete'
  })
}

/**
 * 商品分组 添加
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function addGoodsCategory(params) {
  return request({
    url: 'seller/shops/cats',
    method: 'post',
    data: params
  })
}

/**
 * 商品分组 编辑
 * @param params
 * @returns {Promise<any>}
 * @constructor
 */
export function updateGoodsCategory(ids, params) {
  return request({
    url: `seller/shops/cats/${ids}`,
    method: 'put',
    data: params
  })
}

/**
 * 发布商品 查询商品品类 分级查询（商城商品品类）
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function getGoodsCategoryLevelList(ids, params) {
  return request({
    url: `admin/goods/categories/${ids}/children`,
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 查询常见问题
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function getQuestionCommonDetail(params) {
  return request({
    url: `admin/question/common/detail`,
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 修改常见问题
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function getQuestionCommonUpdate(params) {
  return request({
    url: `/admin/question/common/update`,
    method: 'post',
    loading: false,
    params
  })
}

/**
 * 添加常见问题
 * @param ids
 * @param params
 * @returns {Promise<any>}
 */
export function getQuestionCommonAdd(params) {
  return request({
    url: `/admin/question/common/add`,
    method: 'post',
    loading: false,
    params
  })
}
