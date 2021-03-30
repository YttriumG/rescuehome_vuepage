import request from '../utils/httpRequest'

export function getVolunteerList(pageIndex, pageSize, name) {
  return request({
    url: `/proxyApi/volunteer/list`,
    method: 'get',
    params: {
      'page': pageIndex,
      'limit': pageSize,
      'name': name
    }
  })
}

export function getVolunteerById(id) {
  return request({
    url: `/proxyApi/volunteer/id/${id}`,
    method: 'get'
  })
}

export function updateVolunteer(dataForm) {
  return request({
    url: `/proxyApi/volunteer/update`,
    method: 'post',
    data: {
      'volunteerId': dataForm.volunteerId,
      'volunteerName': dataForm.volunteerName,
      'volunteerSex': dataForm.volunteerSex,
      'volunteerPhone': dataForm.volunteerPhone,
      'volunteerDuration': dataForm.volunteerDuration,
      'volunteerParticipate': dataForm.volunteerParticipate
    }
  })
}

