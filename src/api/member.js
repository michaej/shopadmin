/**
 * 会员管理API
 */

import request from '@/utils/request'
import md5 from 'js-md5'

/**
 * 获取会员列表
 * @param params
 */
export function getMemberList(params) {
  return request({
    url: 'admin/members',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 添加会员
 * @param params
 */
export function addMember(params) {
  params = JSON.parse(JSON.stringify(params))
  params.password = md5(params.password)
  return request({
    url: 'admin/members',
    method: 'post',
    data: params
  })
}

/**
 * 获取会员详情
 * @param id
 */
export function getMemberDetail(id) {
  return request({
    url: `admin/members/${id}`,
    method: 'get'
  })
}

/**
 * 修改会员
 * @param id
 * @param params
 */
export function editMember(id, params) {
  if (params.password) {
    params.password = md5(params.password)
  }
  return request({
    url: `admin/members/${id}`,
    method: 'put',
    data: params
  })
}

/**
 * 删除会员
 * @param id
 */
export function deleteMember(id) {
  return request({
    url: `admin/members/${id}`,
    method: 'delete'
  })
}

/**
 * 获取会员回收站列表
 * @param params
 */
export function getRecycleMemberList(params) {
  return request({
    url: 'admin/members',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 恢复会员
 * @param id
 */
export function recycleMember(id) {
  return request({
    url: `admin/members/${id}`,
    method: 'post'
  })
}

/**
 * 获取会员收货地址列表
 * @param member_id
 * @param params
 */
export function getMemberAddress(member_id, params) {
  return request({
    url: `admin/members/addresses/${member_id}`,
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 获取会员咨询列表
 * @param params
 */
export function getMemberAsks(params) {
  return request({
    url: 'admin/members/asks',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 删除会员咨询
 * @param ask_id
 */
export function deleteMemberAsk(ask_id) {
  return request({
    url: `admin/members/asks/${ask_id}`,
    method: 'delete'
  })
}

/**
 * 获取会员评论列表
 * @param params
 */
export function getMemberComments(params) {
  return request({
    url: '/admin/server/comment/list',
    method: 'get',
    loading: false,
    params
  })
}

/**
 * 删除会员评论
 * @param comment_id
 */
export function deleteMemberComments(params) {
  return request({
    url: `/admin/server/comment/delete`,
    method: 'delete',
    params
  })
}

/**
 * 修改会员消费积分
 * @param member_id
 * @param point
 */
export function editMemberConsumPoint(member_id, point) {
  return request({
    url: `admin/members/point/${member_id}`,
    method: 'put',
    data: { point }
  })
}

/**
 * 获取会员积分列表
 * @param params
 */
export function getMemberPointList(params) {
  return request({
    url: `admin/members/point/${params.member_id}`,
    method: 'get',
    loading: false,
    params
  })
}
