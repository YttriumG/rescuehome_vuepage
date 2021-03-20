import request from '../utils/httpRequest'
import th from "element-ui/src/locale/lang/th";

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

export function updateMissingPeople(dataForm) {
  return request({
    url: `/proxyApi/missing-people/update`,
    method: 'post',
    data: this.$http.adornData({
      'missing_id': this.dataForm.missing_id,
      'missing_person_name': this.dataForm.missing_person_name,
      'missing_person_sex': this.dataForm.missing_person_sex,
      'missing_person_age': this.dataForm.missing_person_age,
      'missing_person_height': this.dataForm.missing_person_height,
      'missing_person_shape': this.dataForm.missing_person_shape,
      'missing_person_clothes': this.dataForm.missing_person_clothes,
      'missing_person_face': this.dataForm.missing_person_face,
      'missing_person_medical_history': this.dataForm.missing_person_medical_history,
      'missing_date': this.dataForm.missing_date,
      'missing_place': this.dataForm.missing_place,
      'missing_whereabouts': this.dataForm.missing_whereabouts,
      'missing_level': this.dataForm.missing_level,
      'missing_state': this.mdataForm.issing_state
    })
  })
}


export function getMissingPeopleByName(name) {
  return request({
    url: '/proxyApi/missing-people/name',
    method: 'get',
    params: name
  })
}

export function getMissingPeopleById(id) {
  return request({
    url: '/proxyApi/missing-people/id',
    method: 'get',
    params: {id}
  })
}

export function addMissingPeople(data) {
  return request({
    url: '/proxyApi/missing-people/create',
    method: 'post',
    data
  })
}


export function deleteMissingPeople(id) {
  return request({
    url: '/proxyApi/missing-people/delete',
    method: 'post',
    params: 'id'
  })
}
