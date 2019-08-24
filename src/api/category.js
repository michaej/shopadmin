/**
 * 分类管理API
 */
import request from '@/utils/request'

/**
 * 添加分类
 * @param params
 */
export function addCategory(params) {
  return request({
    url: 'admin/server/type/add',
    method: 'post',
    params
  })
}

/**
 * 编辑分类
 * @param id
 * @param params
 */
export function editCategory(params) {
  return request({
    url: `admin/server/type/update`,
    method: 'put',
    params
  })
}

/**
 * 根据分类ID获取分类关联品牌数据
 * @param category_id
 * @returns {Promise<any>}
 */
export function getBrandByCategoryId(category_id) {
  return request({
    url: `admin/goods/categories/${category_id}/brands`,
    method: 'get'
  })
}

/**
 * 编辑分类关联品牌
 * @param category_id 分类ID
 * @param choose_brands 品牌数组
 */
export function editCategoryBrand(category_id, choose_brands) {
  return request({
    url: `admin/goods/categories/${category_id}/brands`,
    method: 'put',
    data: { choose_brands }
  })
}

/**
 * 根据分类ID获取分类关联规格数据
 * @param category_id
 * @returns {Promise<any>}
 */
export function getSpecsByCategoryId(category_id) {
  return request({
    url: `admin/goods/categories/${category_id}/specs`,
    method: 'get'
  })
}

/**
 * 编辑分类关联规格
 * @param category_id 分类ID
 * @param choose_specs 规格数组
 * @returns {*}
 */
export function editCategorySpecs(category_id, choose_specs) {
  return request({
    url: `admin/goods/categories/${category_id}/specs`,
    method: 'put',
    data: { choose_specs }
  })
}

/**
 * 删除分类
 * @param ids
 * @returns {*}
 */
export function deleteCategory(params) {
  return request({
    url: `admin/server/type/delete`,
    method: 'delete',
    params,
    loading: false
  })
}

/**
 * 获取分类关联的参数
 * @param category_id 分类ID
 * @returns {*}
 */
export function getCategoryParams(category_id) {
  return request({
    url: `admin/goods/categories/${category_id}/param`,
    method: 'get'
  })
}

/**
 * 获取分类子集
 * @param parent_id
 */
export function getCategoryChildren(parent_id = 0) {
  return request({
    url: `/admin/server/type/list`,
    method: 'get',
    loading: false
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
 * 获取分类列表
 * @param params
 */
export function getTypeList() {
  return request({
    url: '/admin/server/type/list',
    method: 'get'
  })
}

/**
 * 查询分类标签列表列表   待选和可选
 * @param params
 */
export function gqueryCategoryList(category_id) {
  return request({
    url: `/admin/server/type/list`,
    method: 'get'
  })
}

/**
 * 确定提交标签表单
 * @param params
 */
export function getTagData(category_id,choose_brands) {
  return request({
    url: `/admin/goods/categoryLabel/${category_id}`,
    method: 'put',
    data: { choose_brands }
  })
}
