import request from '../utils/httpRequest'

export function getUserList(pageIndex, pageSize, id) {
  return request({
    url: `/proxyApi/wx-user/list`,
    method: 'get',
    params: {
      'pageIndex': pageIndex,
      'pageSize': pageSize,
      'id': id
    }
  })
}

export function getUserInfo(openId){
  return request({
    url:`/proxyApi/wx-user/second-login`,
    method: 'get',
    params:{
      "openId": openId
    }
  })
}
