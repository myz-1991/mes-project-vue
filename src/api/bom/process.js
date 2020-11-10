import request from '@/utils/request'

export function savaProcess(data) {
  debugger
  return request({
    url: '/bom/v1/process/savaProcess',
    method: 'post',
    data: JSON.stringify(data)
  })
}

export function updateProcess(data) {
  return request({
    url: '/bom/v1/process/updateProcess',
    method: 'put',
    data: JSON.stringify(data)
  })
}

export function findProcessById(id) {
  return request({
    url: '/bom/v1/process/findProcessById',
    method: 'get',
    params: {
      id: id
    }
  })
}

export function deleteProcess(id) {
  return request({
    url: '/bom/v1/process/deleteProcess',
    method: 'delete',
    params: {
      id: id
    }
  })
}

export function findProcessPage(id, vId, param, size, pageIndex) {
  return request({
    url: '/bom/v1/process/findProcessPage',
    method: 'get',
    params: {
    	id : id,
      vId : vId,
    	param: param,
    	size: size,
    	current: pageIndex
    }
  })
}

export function findProcessList(id, vId, param, size, pageIndex) {
  return request({
    url: '/bom/v1/process/findProcessList',
    method: 'get',
    params: {
    	id : id,
      vId : vId,
    	param: param
    }
  })
}
