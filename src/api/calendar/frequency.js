import request from '@/utils/request'

export function saveFrequency(data){
  return request({
    url : '/calendar/v1/frequency/saveFrequency',
    method : 'post',
    data : JSON.stringify(data)
  })
}

export function updateFrequency(data) {
  return request({
    url : '/calendar/v1/frequency/updateFrequency',
    method : 'put',
    data : JSON.stringify(data)
  })
}

export function findFrequency(id) {
  return request({
    url : '/calendar/v1/frequency/findFrequency',
    method : 'get',
    params : {
      id : id
    }
  })
}

export function deleteFrequency(id) {
  return request({
    url : '/calendar/v1/frequency/deleteFrequency',
    method : 'delete',
    params : {
      id : id
    }
  })
}

export function listFrequencyByParam(name) {
  return request({
    url : '/calendar/v1/frequency/listFrequencyByParam',
    method : 'get',
    params : {
      name : name
    }
  })
}
