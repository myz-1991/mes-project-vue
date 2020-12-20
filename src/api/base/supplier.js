import request from '@/utils/request'

export function saveSupplier(data){
  return request({
    url : '/base/v1/supplier/saveSupplier',
    method : 'post',
    data : JSON.stringify(data)
  })
}

export function updateSupplier(data) {
  return request({
    url : '/base/v1/supplier/updateSupplier',
    method : 'put',
    data : JSON.stringify(data)
  })
}

export function findSupplierById(id) {
  return request({
    url : '/base/v1/supplier/findSupplierById',
    method : 'get',
    params : {
      id : id
    }
  })
}

export function deleteSupplierById(id) {
  return request({
    url : '/base/v1/supplier/deleteSupplierById',
    method : 'delete',
    params : {
      id : id
    }
  })
}

export function findSupplierPage(param, type, pageSize, pageIndex) {
  return request({
    url : '/base/v1/supplier/findSupplierPage',
    method : 'get',
    params : {
      param : param,
      type : type,
      size : pageSize,
      current : pageIndex
    }
  })
}

export function findSupplierList(param, type) {
  return request({
    url : '/base/v1/supplier/findSupplierList',
    method : 'get',
    params : {
      param : param,
      type : type
    }
  })
}

export function importSuppliers(data) {
  return request({
    url : '/base/v1/supplier/importSuppliers',
    method : 'post',
    data : data
  })
}
