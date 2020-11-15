import request from '@/utils/request'

export function saveJob(data){
  return request({
    url : '/smelt/v1/job/saveJob',
    method : 'post',
    data : JSON.stringify(data)
  })
}

export function addJob(){
  return request({
    url : '/smelt/v1/job/addJob',
    method : 'post'
  })
}

export function updateJob(data) {
  return request({
    url : '/smelt/v1/job/updateJob',
    method : 'put',
    data : JSON.stringify(data)
  })
}

export function findJob(id) {
  return request({
    url : '/smelt/v1/job/findJob',
    method : 'get',
    params : {
      id : id
    }
  })
}

export function deletJob(id) {
  return request({
    url : '/smelt/v1/job/deletJob',
    method : 'delete',
    params : {
      id : id
    }
  })
}

export function pageJob(name, startDate, endDate, pageSize, pageIndex) {
  return request({
    url : '/smelt/v1/job/pageJob',
    method : 'get',
    params : {
      name : name,
      startDate : startDate,
      endDate : endDate,
      size : pageSize,
      current : pageIndex
    }
  })
}
