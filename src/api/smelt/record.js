import request from '@/utils/request'

export function saveAccessRecord(data){
  return request({
    url : '/smelt/v1/record/saveAccessRecord',
    method : 'post',
    data : JSON.stringify(data)
  })
}

export function updateAccessRecord(data) {
  return request({
    url : '/smelt/v1/record/updateAccessRecord',
    method : 'put',
    data : JSON.stringify(data)
  })
}

export function findAccessRecord(id) {
  return request({
    url : '/smelt/v1/record/findAccessRecord',
    method : 'get',
    params : {
      id : id
    }
  })
}

export function findStock() {
  return request({
    url : '/smelt/v1/stock/findStock',
    method : 'get'
  })
}

export function deleteAccessRecord(id) {
  return request({
    url : '/smelt/v1/record/deleteAccessRecord',
    method : 'delete',
    params : {
      id : id
    }
  })
}

export function pageAccessRecord(startDate, endDate, pageSize, pageIndex) {
  return request({
    url : '/smelt/v1/record/pageAccessRecord',
    method : 'get',
    params : {
      startDate : startDate,
      endDate : endDate,
      size : pageSize,
      current : pageIndex
    }
  })
}
