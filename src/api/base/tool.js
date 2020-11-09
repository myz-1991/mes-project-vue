<<<<<<< HEAD
import request from '@/utils/request'

export function saveTool(data){
  return request({
    url : '/base/v1/tool/saveTool',
    method : 'post',
    data : JSON.stringify(data)
  })
}

export function updateTool(data) {
  return request({
    url : '/base/v1/tool/updateTool',
    method : 'put',
    data : JSON.stringify(data)
  })
}

export function findToolById(id) {
  return request({
    url : '/base/v1/tool/findToolById',
    method : 'get',
    params : {
      id : id
    }
  })
}

export function findToolPage(param, pageSize, pageIndex) {
  return request({
    url : '/base/v1/tool/findToolPage',
    method : 'get',
    params : {
      param : param,
      size : pageSize,
      current : pageIndex
    }
  })
}

export function findToolList(param) {
  return request({
    url : '/base/v1/tool/findToolList',
    method : 'get',
    params : {
      param : param
    }
  })
=======
import request from '@/utils/request'

export function saveTool(data){
  return request({
    url : '/base/v1/tool/saveTool',
    method : 'post',
    data : JSON.stringify(data)
  })
}

export function updateTool(data) {
  return request({
    url : '/base/v1/tool/updateTool',
    method : 'put',
    data : JSON.stringify(data)
  })
}

export function findToolById(id) {
  return request({
    url : '/base/v1/tool/findToolById',
    method : 'get',
    params : {
      id : id
    }
  })
}

export function findToolPage(param, pageSize, pageIndex) {
  return request({
    url : '/base/v1/tool/findToolPage',
    method : 'get',
    params : {
      param : param,
      size : pageSize,
      current : pageIndex
    }
  })
}

export function findToolList(param) {
  return request({
    url : '/base/v1/tool/findToolList',
    method : 'get',
    params : {
      param : param
    }
  })
>>>>>>> 2c39793ea8f7012e706c3251692e35ccf732f5fe
}