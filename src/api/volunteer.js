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
    url: `/proxyApi/volunteer/id`,
    method: 'get',
    params:{
      'id': id
    }
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

//获得待审核志愿者信息
export function getApprovalVolunteer(pageIndex, pageSize) {
  return request({
    url: `/proxyApi/volunteer/approval-list`,
    method: 'get',
    params: {
      'page': pageIndex,
      'limit': pageSize
    }
  })
}

//获得志愿者搜救情况
export function getOnlineVolunteer(pageIndex, pageSize) {
  return request({
    url: `/proxyApi/report/list`,
    method: 'get',
    params: {
      'page': pageIndex,
      'limit': pageSize
    }
  })
}

//获取某一志愿者具体搜救信息
export function getReport(id) {
  return request({
    url: `/proxyApi/report/id`,
    method: 'get',
    params: {
      'id': id
    }
  })
}

//获取在线志愿者位置信息
export function getLocations(){
  return request({
    url: `/proxyApi/report/getLocation`,
    method: 'get'
  })
}
