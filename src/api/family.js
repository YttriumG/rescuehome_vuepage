import request from '../utils/httpRequest'

export function getFamilyList( pageIndex, pageSize, name ){
  return request({
    url: `/proxyApi/family/list`,
    method: 'get',
    params: {
      'page': pageIndex,
      'limit': pageSize,
      'name': name
    }
  })
}
