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

export function getFamilyById(id){
  return request({
    url: `/proxyApi/family/id`,
    method: 'get',
    params: {
      "id" : id
    },
  })
}

export function updateFamily(dataForm){
  return request({
    url: `/proxyApi/family/update`,
    method:'post',
    data:{
      'familyId' : dataForm.familyId,
      'familyName' : dataForm.familyName,
      'familyPhone' : dataForm.familyPhone,
      'familyPlace' : dataForm.familyPlace,
      'familySex' : dataForm.familySex,
      'missingId' : dataForm.missingId
    }
  })
}

export function deleteFamilyById(id){
  return request({
    url: `/proxyApi/family/delete/${id}`,
    method: 'delete',
    params: '',
  })
}
