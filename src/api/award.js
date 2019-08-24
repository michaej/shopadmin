/**
 * 奖品记录API
 */

import request from '@/utils/request'

/**
 * 奖品记录列表
 * @param params
 */
export function getAwardList(params) {
    return request({
        url: '/admin/bonus/record/list',
        method: 'get',
        loading: false,
        params
    })
}

/**
 * 奖品记录列表
 * @param params
 */
export function exportAwardList(params) {
    return request({
        url: '/admin/bonus/record/export',
        method: 'get',
        loading: false,
        params
    })
}

/**
 * 提现记录列表
 * @param params
 */
export function getCashList(params) {
    return request({
        url: '/admin/bonus/withdraw',
        method: 'get',
        loading: false,
        params
    })
}

/**
 * 活动列表
 * @param params
 */
export function getActivityList(params) {
    return request({
        url: '/admin/bonus/activity',
        method: 'get',
        loading: false,
        params
    })
}

/**
 * 获取客户列表
 * @param params
 */
export function getAmountList(params) {
    return request({
        url: '/admin/members/customer/findCustomerList',
        method: 'get',
        loading: false,
        params
    })
}

/**
 * 导出抽奖次数列表
 * @param params
 */
export function exportAmountList(params) {
    return request({
        url: '/admin/bonus/qualification/export',
        method: 'get',
        loading: false,
        params
    })
}

/**
 * 添加抽奖活动及奖品
 * @param params
 */
export function addAward(params) {
    return request({
        url: '/admin/bonus/activity/activityprize',
        method: 'post',
        loading: false,
        data: params,
        headers: { 'Content-Type': 'application/json' },
    })
}

/**
 * 
 * @param params
 */
export function auditor(id, auditor_status, params) {
    return request({
        url: `/admin/bonus/withdraw/auditor/${id}/${auditor_status}`,
        method: 'post',
        loading: false,
        params: params,
        // headers: { 'Content-Type': 'application/json' },
    })
}

/**
 * 编辑抽奖活动及奖品
 * @param params
 */
export function editAward(id, params) {
    return request({
        url: `/admin/bonus/activity/activityprize/${id}`,
        method: 'put',
        loading: false,
        data: params,
        headers: { 'Content-Type': 'application/json' },
    })
}

/**
 * 查看抽奖活动及奖品
 * @param params
 */
export function checkAward(id) {
    return request({
        url: `/admin/bonus/activity/${id}`,
        method: 'get',
        loading: false,
        // headers: { 'Content-Type': 'application/json' },
    })
}

/**
 * 删除抽奖活动及奖品
 * @param params
 */
export function delAward(ids) {
    return request({
        url: `/admin/bonus/activity/${ids}`,
        method: 'delete',
        loading: false,
        // headers: { 'Content-Type': 'application/json' },
    })
}


/**
 * 导出提现记录
 * @param params
 */
export function exportCash(params) {
    return request({
        url: `/admin/bonus/withdraw/export`,
        method: 'get',
        loading: false,
        params
    })
}