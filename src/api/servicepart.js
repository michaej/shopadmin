/**
 * 商品服务API
 */

import request from '@/utils/request'

/**
 * 获取分类部位列表
 * @param params
 */
export function getServerPartList(params) {
  return request({
    url: '/admin/server/part/list',
    method: 'get'
  })
}

/**
 * 新增分类标签
 */
export function addTagLabel(params) {
  return request({
    url: `/admin/server/part/add`,
    method: 'post',
    data: params
  })
}

/**
 * 删除分类标签
 */
export function deleteTagList(params) {
  return request({
    url: `/admin/server/part/delete`,
    method: 'delete',
    params
  })
}

/**
 * 修改商品服务
 */
export function updateTagList(params) {
  return request({
    url: `/admin/server/part/update`,
    method: 'put',
    data: params
  })
}
