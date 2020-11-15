import request from '@/utils/request'

export function saveCrucible(data){
  return request({
    url : '/smelt/v1/crucible/saveCrucible',
    method : 'post',
    data : JSON.stringify(data)
  })
}

export function updateCrucible(data) {
  return request({
    url : '/smelt/v1/crucible/updateCrucible',
    method : 'put',
    data : JSON.stringify(data)
  })
}

export function findCrucible(id) {
  return request({
    url : '/smelt/v1/crucible/findCrucible',
    method : 'get',
    params : {
      id : id
    }
  })
}

export function deleteCrucible(id) {
  return request({
    url : '/smelt/v1/crucible/deleteCrucible',
    method : 'delete',
    params : {
      id : id
    }
  })
}

export function pageCrucible(param, pageSize, pageIndex) {
  return request({
    url : '/smelt/v1/crucible/pageCrucible',
    method : 'get',
    params : {
      param : param,
      size : pageSize,
      current : pageIndex
    }
  })
}

export function listCrucible(param) {
  return request({
    url : '/smelt/v1/crucible/listCrucible',
    method : 'get',
    params : {
      param : param
    }
  })
}