import request from '@/utils/request'

export function saveCaledar(data){
  return request({
    url : '/calendar/v1/calendar/saveCaledar',
    method : 'post',
    data : JSON.stringify(data)
  })
}

export function batchSaveCaledar(data){
  return request({
    url : '/calendar/v1/calendar/batchSaveCaledar',
    method : 'post',
    data : JSON.stringify(data)
  })
}

export function updateCaledar(data) {
  return request({
    url : '/calendar/v1/calendar/updateCaledar',
    method : 'put',
    data : JSON.stringify(data)
  })
}

export function findCaledar(id) {
  return request({
    url : '/calendar/v1/calendar/findCaledar',
    method : 'get',
    params : {
      id : id
    }
  })
}

export function deleteFrequency(id) {
  return request({
    url : '/calendar/v1/calendar/deleteCaledar',
    method : 'delete',
    params : {
      id : id
    }
  })
}

export function listCaledarByParam(workingDate, orgId) {
  return request({
    url : '/calendar/v1/calendar/listCaledarByParam',
    method : 'get',
    params : {
      workingDate : workingDate,
      orgId : orgId
    }
  })
}
