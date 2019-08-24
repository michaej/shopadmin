/**
 * 商品管理API
 */
/* eslint-disable */ 
import request from '@/utils/request'

/**
 * 获取商品列表
 * @param params
 */
export function getGoodsList(params) {
    return request({
        url: 'product/AllInProduct',
        method: 'get',
        loading: false,
        params
    })
}

