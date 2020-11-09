import request from '@/utils/request'

export function saveMould(data){
  return request({
    url : '/base/v1/mould/saveMould',
    method : 'post',
    data : JSON.stringify(data)
  })
}

export function updateMould(data) {
  return request({
    url : '/base/v1/mould/updateMould',
    method : 'put',
    data : JSON.stringify(data)
  })
}

export function findMouldById(id) {
  return request({
    url : '/base/v1/mould/findMouldById',
    method : 'get',
    params : {
      id : id
    }
  })
}

export function findMouldPage(param, pageSize, pageIndex) {
  return request({
    url : '/base/v1/mould/findMouldPage',
    method : 'get',
    params : {
      param : param,
      size : pageSize,
      current : pageIndex
    }
  })
}

export function findMouldList(param) {
  return request({
    url : '/base/v1/mould/findMouldList',
    method : 'get',
    params : {
      param : param
    }
  })
}