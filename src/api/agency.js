/**
 * 结算单相关API
 */

import request from '@/utils/request'

/**
 * 获取流水查询
 * @param params
 * @returns {Promise<any>}
 */
export function getFlowQueryList(params) {
    return request({
        url: `/admin/bills/items`,
        method: 'get',
        loading: false,
        params
    })
}


/**
 * 获取审核管理列表
 * @param params
 * @returns {Promise<any>}
 */
export function getAgencyList(params) {
    return request({
        url: '/admin/shops/agent/list',
        method: 'get',
        loading: false,
        params
    })
}

/**
 * 导出提现审核
 * @param params
 * @returns {Promise<any>}
 */
export function getRecordExport(params) {
    return request({
        url: '/admin/draw/record/export',
        method: 'get',
        loading: false,
        params
    })
}

/**
 * 获取审核账单详情
 * @param params
 * @returns {Promise<any>}
 */
export function getMonthlyDetail(bill_id) {
    return request({
        url: `/admin/draw/record/${bill_id}`,
        method: 'get',
        loading: false
    })
}

/**
 * 获取代理详情
 * @param params
 * @returns {Promise<any>}
 */
export function getAgentDetail(params) {
    return request({
        url: `/admin/shops/agent/getAgentDetail`,
        method: 'get',
        loading: false,
        params
    })
}


/**
 * 获取账单ID和账单类型查询账单列表
 * @param params
 * @returns {Promise<any>}
 */
export function getMonthlyDetailList(bill_id, item_type, params) {
    return request({
        url: `/seller/bills/items/${bill_id}/${item_type}`,
        method: 'get',
        loading: false,
        params
    })
}


/**
 * 获取账单ID和账单类型查询账单列表
 * @param params
 * @returns {Promise<any>}
 */
export function getMonthlyExport(bill_id) {
    return request({
        url: `/admin/bills/${bill_id}/export`,
        method: 'get',
        loading: false
    })
}

/**
 * 确认账单
 * @param params
 * @returns {Promise<any>}
 */
export function enterBill(bill_id) {
    return request({
        url: `/seller/bills/${bill_id}/next`,
        method: 'put',
        loading: false
    })
}

/**
 * 审核
 * @param params
 * @returns {Promise<any>}
 */
export function enterAudit(params) {
    return request({
        url: `/admin/draw/record/review`,
        method: 'put',
        loading: false,
        params
    })
}


/**
 * 批量审核
 * @param params
 * @returns {Promise<any>}
 */
export function batchAudit(ids, auditor_status, params) {
    return request({
        url: `/admin/bills/${ids}/batch/auditor/${auditor_status}`,
        method: 'post',
        loading: false,
        params
    })
}

/**
 * 出纳审核
 * @param params
 * @returns {Promise<any>}
 */
export function moneyAudit(bill_id, auditor_status, params) {
    return request({
        url: `/admin/bills/${bill_id}/cashier/auditor/${auditor_status}`,
        method: 'post',
        loading: false,
        params
    })
}

/**
 * 平台确认付款
 * @param params
 * @returns {Promise<any>}
 */
export function payAudit(bill_id) {
    return request({
        url: `/admin/bills/${bill_id}/pay`,
        method: 'post',
        loading: false,
    })
}


/**
 * 申请提现
 * @param params
 * @returns {Promise<any>}
 */
export function withdraw(bill_id) {
    return request({
        url: `/seller/bills/${bill_id}/withdraw`,
        method: 'put',
        loading: false
    })
}


/**
 * 提现设置
 * @param params
 * @returns {Promise<any>}
 */
export function postCycleSetting(withdraw_status, params) {
    return request({
        url: `/admin/distribution/withdraw/cycle-setting/${withdraw_status}`,
        method: 'post',
        loading: false,
        params
    })
}

/**
 * 提现设置
 * @param params
 * @returns {Promise<any>}
 */
export function postShopsDisable(shop_id) {
    return request({
        url: `/admin/shops/disable/${shop_id}`,
        method: 'put',
        loading: false
    })
}

/**
 * 获取提现设置
 * @param params
 * @returns {Promise<any>}
 */

export function getCycleSetting(params) {
    return request({
        url: `/admin/distribution/withdraw/getCycleSetting/`,
        method: 'get',
        loading: false,
        params
    })
}

// /**
//  * 导出结算单
//  * @param params
//  */
// export function exportSettleMentExcel(id) {
//   return request({
//     url: `seller/order/bills/${id}/export`,
//     method: 'get',
//     loading: false
//   })
// }

// /**
//  * 商家查看某详细账单
//  * @param ids
//  * @param params
//  * @returns {Promise<any>}
//  */
// export function getBillDetails(ids, params) {
//   return request({
//     url: `seller/order/bills/${ids}`,
//     method: 'get',
//     loading: false,
//     params
//   })
// }

// /**
//  * 查看本期账单中的订单列表或者退款单列表
//  * @param id
//  * @param type
//  * @param params
//  * @returns {Promise<any>}
//  */
// export function getOrderList(id, type, params) {
//   return request({
//     url: `seller/order/bills/${id}/${type}`,
//     method: 'get',
//     loading: false,
//     params
//   })
// }

// /**
//  * 卖家对账单进行下一步操作 确认结算
//  * @param id
//  * @param params
//  * @returns {Promise<any>}
//  */
// export function confirmSettle(id, params) {
//   return request({
//     url: `seller/order/bills/${id}/next`,
//     method: 'put',
//     loading: false,
//     params
//   })
// }