/**
 * 商品服务API
 */

import request from '@/utils/request'

/**
 * 获取店铺档次列表
 * @param params
 */
export function getGradeList(params) {
  return request({
    url: '/admin/activity/shop-grade',
    method: 'get',
    params
  })
}


/**
 * 作废店铺档次
 */
export function obsoleteGrade(id,status,params) {
  return request({
    url: `/admin/activity/shop-grade/update-status/${id}/${status}`,
    method: 'post',
    params
  })
}


/**
 * 新增店铺档次
 */
export function addGrade(params) {
  return request({
    url: `/admin/activity/shop-grade`,
    method: 'post',
    data: params
  })
}



/**
 * 修改商品服务
 */
export function editGrade(id,params) {
  return request({
    url: `/admin/activity/shop-grade/${id}`,
    method: 'put',
    data: params
  })
}






