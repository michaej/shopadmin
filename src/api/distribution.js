/**
 * 分销相关API
 */

import request from '@/utils/request'

/**
 * 获取个人提成模板列表
 * @param params
 */
export function getPerAccomplishmentTpl(params) {
  return request({
    url: 'admin/distribution/commission-tpl',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 添加提成模板
 * @param params
 */
export function addPerTpl(params) {
  return request({
    url: 'admin/distribution/commission-tpl',
    method: 'post',
    loading: false,
    params
  })
}

/**
 * 修改提成模板
 * @param params
 */
export function editPerTpl(params) {
  return request({
    url: `admin/distribution/commission-tpl/${params.id}`,
    method: 'put',
    loading: false,
    params
  })
}

/**
 * 删除提成模板
 * @param id
 */
export function delPerTpl(id) {
  return request({
    url: `admin/distribution/commission-tpl/${id}`,
    method: 'delete',
    loading: false
  })
}

/**
 * 获取提成模板
 * @param id
 */
export function getPerTpl(id) {
  return request({
    url: `admin/distribution/commission-tpl/${id}`,
    method: 'get',
    loading: false
  })
}

/**
 * 获取分销模板升级日志
 */
export function getUpgradeLogs(params) {
  return request({
    url: 'admin/distribution/upgradelog',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 获取个人分销商列表
 * @param params
 */
export function getDistributorList(params) {
  return request({
    url: 'admin/distribution/member',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 修改分销商模板
 * @param params
 */
export function modifyTpl(params) {
  return request({
    url: `admin/distribution/member/tpl`,
    method: 'put',
    loading: false,
    params
  })
}

/**
 * 获取订单数量图 = 订单数
 * @param params
 */
export function getOrderCountChart(params) {
  return request({
    url: 'admin/distribution/statistic/count',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 获取订单金额图 = 营业额
 * @param params
 */
export function getOrderAmountChart(params) {
  return request({
    url: 'admin/distribution/statistic/order',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 获取订单返现图 = 利润额
 * @param params
 */
export function getProfitChart(params) {
  return request({
    url: 'admin/distribution/statistic/push',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 业绩列表
 * @param params
 */
export function getAchievementList(params) {
  return request({
    url: 'admin/distribution/bill/total',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 账单列表
 * @param params
 */
export function getBillList(params) {
  return request({
    url: 'admin/distribution/bill/member',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 获取某个账单详情
 * @param id
 */
export function getDisBillDetails(id) {
  return request({
    url: `admin/distribution/bill/member/${id}`,
    method: 'get',
    loading: false
  })
}

/**
 * 分销订单列表
 * @param params
 */
export function getDisOrderList(params) {
  return request({
    url: 'admin/distribution/order',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 分销退款单查询
 * @param params
 */
export function getDisRefundOrderList(params) {
  return request({
    url: 'admin/distribution/order/sellback',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 获取某个分销商下级业绩
 * @param params
 */
export function getDisBillDown(params) {
  return request({
    url: 'admin/distribution/bill/member/down',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 提现申请/提现记录列表
 * @param params
 */
export function getWithdrawApplyList(params) {
  return request({
    url: 'admin/distribution/withdraw/apply',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 审核提现申请
 * @param params
 */
export function authWithdrawApply(params) {
  return request({
    url: 'admin/distribution/withdraw/auditing',
    method: 'post',
    loading: false,
    params
  })
}

/**
 * 设为已转账
 * @param params
 */
export function setTransferAccounts(params) {
  return request({
    url: 'admin/distribution/withdraw/account/end',
    method: 'post',
    loading: false,
    params
  })
}

/**
 * 获取提现设置
 * @param params
 */
export function getWithDrawSettings() {
  return request({
    url: 'admin/distribution/settings',
    method: 'get',
    loading: false
  })
}

/**
 * 保存提现设置
 * @param params
 */
export function reserveWithDrawSettings(params) {
  return request({
    url: 'admin/distribution/settings',
    method: 'put',
    loading: false,
    params
  })
}

/**
 * 获取用户等级列表
 * @param params
 */
export function getUserLevelList(params) {
  return request({
    url: 'admin/distribution/userlevel',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 保存个人用户信息
 * @param params
 */
export function saveUserLevelList(params) {
  return request({
    url: 'admin/distribution/userlevel',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    params
  })
}

/**
 * 编辑个人用户信息
 * @param params
 */
export function editUserLevelList(id, params) {
  return request({
    url: `admin/distribution/userlevel/${id}`,
    method: 'put',
    data: params
  })
}

/**
 * 删除用户等级
 * @param params
 */
export function deleteUserLevelList(id) {
  return request({
    url: `admin/distribution/userlevel/${id}`,
    method: 'delete'
  })
}

/**
 * 获取佣金比例列表
 * @param params
 */
export function getCommissionrate(params) {
  return request({
    url: 'admin/distribution/commissionrate',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 添加佣金比例
 * @param params
 */
export function saveCommissionrate(params) {
  return request({
    url: 'admin/distribution/commissionrate',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    params
  })
}

/**
 * 更新佣金比例
 * @param params
 */
export function editCommissionrate(id, params) {
  return request({
    url: `admin/distribution/commissionrate/${id}`,
    method: 'put',
    data: params
  })
}

/**
 * 删除佣金比例
 * @param params
 */
export function deleteCommissionrate(id) {
  return request({
    url: `admin/distribution/commissionrate/${id}`,
    method: 'delete'
  })
}
