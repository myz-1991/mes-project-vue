import request from '@/utils/request'

export function saveScheduling(data){
  return request({
    url : '/calendar/v1/scheduling/saveScheduling',
    method : 'post',
    data : JSON.stringify(data)
  })
}

export function batchSaveScheduling(data){
  return request({
    url : '/calendar/v1/scheduling/batchSaveScheduling',
    method : 'post',
    data : JSON.stringify(data)
  })
}

export function updateScheduling(data){
  return request({
    url : '/calendar/v1/scheduling/updateScheduling',
    method : 'put',
    data : JSON.stringify(data)
  })
}

export function findScheduling(id) {
  return request({
    url : '/calendar/v1/scheduling/findScheduling',
    method : 'get',
    params : {
      id : id
    }
  })
}

export function deleteScheduling(id) {
  return request({
    url : '/calendar/v1/scheduling/deleteScheduling',
    method : 'delete',
    params : {
      id : id
    }
  })
}

export function pageScheduling(caleId, param, pageSize, pageIndex) {
  return request({
    url : '/calendar/v1/scheduling/pageScheduling',
    method : 'get',
    params : {
      caleId : caleId,
      param : param,
      size : pageSize,
      current : pageIndex
    }
  })
}

export function listScheduling(caleId, param) {
  return request({
    url : '/calendar/v1/scheduling/listScheduling',
    method : 'get',
    params : {
      caleId : caleId,
      param : param
    }
  })
}
