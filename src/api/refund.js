/**
 * 退款单API
 */

import request from '@/utils/request'

/**
 * 获取退款单列表
 * @param params
 */
export function getRefundList(params) {
  return request({
    url: 'admin/after-sales/refund',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 获取收获订单
 * @param params
 */
export function getRefundLists(params) {
  return request({
    url: '/admin/server/refund/list',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 获取售后详情
 * @param sn
 */
export function getRefundDetail(sn) {
  return request({
    url: `admin/after-sales/refund/${sn}`,
    method: 'get',
    loading: false
  })
}

/**
 * 获取售后详情
 * @param sn
 */
export function getRefundDetails(params) {
  return request({
    url: `/admin/server/refund/detail`,
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 平台退款
 * @param sn
 * @param params
 */
export function refundMoney(params) {
  return request({
    url: `/admin/server/refund/confirm-refund`,
    method: 'get',
    params
  })
}

/**
 * 平台调整售后状态
 * @param sn
 * @param params
 */
export function editRefundStatus(sn,refund_status, params) {
  return request({
    url: `admin/after-sales/status-adjust/${sn}/${refund_status}`,
    method: 'post',
    data: params
  })
}

/**
 * 导出Excel
 * @param params
 */
export function exportRefundExcel(params) {
  return request({
    url: 'admin/after-sales/exports/excel',
    method: 'get',
    params
  })
}
