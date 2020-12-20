import request from '@/utils/request'

export function saveClamp(data){
  return request({
    url : '/base/v1/clamp/saveClamp',
    method : 'post',
    data : JSON.stringify(data)
  })
}

export function updateClamp(data) {
  return request({
    url : '/base/v1/clamp/updateClamp',
    method : 'put',
    data : JSON.stringify(data)
  })
}

export function findClampById(id) {
  return request({
    url : '/base/v1/clamp/findClampById',
    method : 'get',
    params : {
      id : id
    }
  })
}

export function findClampPage(param, pageSize, pageIndex) {
  return request({
    url : '/base/v1/clamp/findClampPage',
    method : 'get',
    params : {
      param : param,
      size : pageSize,
      current : pageIndex
    }
  })
}

export function findClampList(param) {
  return request({
    url : '/base/v1/clamp/findClampList',
    method : 'get',
    params : {
      param : param
    }
  })
}

export function importClamps(data) {
  return request({
    url : '/base/v1/clamp/importClamps',
    method : 'post',
    data : data
  })
}