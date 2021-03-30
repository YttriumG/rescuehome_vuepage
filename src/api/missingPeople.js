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
      'missing_id': dataForm.missing_id,
      'missing_person_name': dataForm.missing_person_name,
      'missing_person_sex': dataForm.missing_person_sex,
      'missing_person_age': dataForm.missing_person_age,
      'missing_person_height': dataForm.missing_person_height,
      'missing_person_shape': dataForm.missing_person_shape,
      'missing_person_clothes': dataForm.missing_person_clothes,
      'missing_person_face': dataForm.missing_person_face,
      'missing_person_medical_history': dataForm.missing_person_medical_history,
      'missing_date': dataForm.missing_date,
      'missing_place': dataForm.missing_place,
      'missing_whereabouts': dataForm.missing_whereabouts,
      'missing_level': dataForm.missing_level,
      'missing_state': dataForm.missing_state
    }
  })
}

export function getMissingPeopleById(id) {
  return request({
    url: `/proxyApi/missing-people/id/${id}`,
    method: 'get',
    params: '',
  })
}


export function deleteMissingPeople(id) {
  return request({
    url: `/proxyApi/missing-people/delete/${id}`,
    method: 'delete',
    params: ''
  })
}


export function addMissingPeople(data) {
  return request({
    url: '/proxyApi/missing-people/create',
    method: 'post',
    data
  })
}

