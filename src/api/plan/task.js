import request from '@/utils/request'

export function saveTask(data){
  return request({
    url : '/plan/v1/task/saveTask',
    method : 'post',
    data : JSON.stringify(data)
  })
}

export function updateTask(data){
  return request({
    url : '/plan/v1/task/updateTask',
    method : 'put',
    data : JSON.stringify(data)
  })
}

export function findTask(id) {
  return request({
    url : '/plan/v1/task/findTask',
    method : 'get',
    params : {
      id : id
    }
  })
}

export function deleteTask(id) {
  return request({
    url : '/plan/v1/task/deleteTask',
    method : 'delete',
    params : {
      id : id
    }
  })
}

export function pageTaskByParam(param, mateName, mateCode, pageIndex, pageSize) {
  return request({
    url : '/plan/v1/task/pageTaskByParam',
    method : 'get',
    params : {
      param : param,
      mateName : mateName,
	  mateCode : mateCode,
	  current : pageIndex,
	  size : pageSize
    }
  })
}
