/**
 * 好物优享API
 */

import request from '@/utils/request'

/**
 * 获取未添加好物优选列表
 * @param params
 */
export function getGoodsList(params) {
  return request({
    url: '/admin/activity/bestgoods/select',
    method: 'get',
    loading: false,
    params
  })
}


/**
 * 添加好物优享
 */
export function addBestGoods(params) {
  return request({
    url: `/admin/activity/bestgoods/addbestgoods`,
    method: 'post',
    loading: false,
    params
  })
}


