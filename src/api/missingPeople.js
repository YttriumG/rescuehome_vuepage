import request from '../utils/httpRequest'

export function getMissingPeopleList(pageIndex, pageSize, name) {
  return request({
    url: `/proxyApi/missing-people/list`,
    method: 'get',
    params: {
      'page': pageIndex,
      'limit': pageSize,
      'name': name
    }
  })
}

export function getMissingPeopleApproval(pageIndex, pageSize) {
  return request({
    url: `/proxyApi/missing-people/approval`,
    method: 'get',
    params: {
      'page': pageIndex,
      'limit': pageSize
    }
  })
}

export function updateMissingPeople(dataForm) {
  return request({
    url: `/proxyApi/missing-people/update`,
    method: 'post',
    data: {
      'missingId': dataForm.missingId,
      'familyId':dataForm.familyId,
      'missingPersonName': dataForm.missingPersonName,
      'missingPersonSex': dataForm.missingPersonSex,
      'missingPersonAge': dataForm.missingPersonAge,
      'missingPersonHeight': dataForm.missingPersonHeight,
      'missingPersonShape': dataForm.missingPersonShape,
      'missingPersonClothes': dataForm.missingPersonClothes,
      'missingPersonFace': dataForm.missingPersonFace,
      'missingPersonMedicalHistory': dataForm.missingPersonMedicalHistory,
      'missingDate': dataForm.missingDate,
      'missingPlaceLongitude':dataForm.missingPlaceLongitude,
      'missingPlaceLatitude':dataForm.missingPlaceLatitude,
      'missingWhereabouts': dataForm.missingWhereabouts,
      'missingLevel': dataForm.missingLevel,
      'missingState': dataForm.missingState
    }
  })
}

export function getMissingPeopleById(id) {
  return request({
    url: `/proxyApi/missing-people/id/${id}`,
    method: 'get',
    params: ''
  })
}


export function deleteMissingPeople(id) {
  return request({
    url: `/proxyApi/missing-people/delete/${id}`,
    method: 'delete',
    params: ''
  })
}


export function addMissingPeople(dataForm) {
  return request({
    url: '/proxyApi/missing-people/create',
    method: 'post',
    data:{
      'familyId':dataForm.familyId,
      'missingPersonName': dataForm.missingPersonName,
      'missingPersonSex': dataForm.missingPersonSex,
      'missingPersonAge': dataForm.missingPersonAge,
      'missingPersonHeight': dataForm.missingPersonHeight,
      'missingPersonShape': dataForm.missingPersonShape,
      'missingPersonClothes': dataForm.missingPersonClothes,
      'missingPersonFace': dataForm.missingPersonFace,
      'missingPersonMedicalHistory': dataForm.missingPersonMedicalHistory,
      'missingPlaceLongitude':dataForm.missingPlaceLongitude,
      'missingPlaceLatitude':dataForm.missingPlaceLatitude,
      'missingWhereabouts': dataForm.missingWhereabouts,
      'missingState': 1,
      'missingLevel': dataForm.missingLevel
    }
  })
}

