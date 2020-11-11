import request from '@/utils/request'

export function saveEquipment(data){
  return request({
    url : '/base/v1/equipment/saveEquipment',
    method : 'post',
    data : JSON.stringify(data)
  })
}

export function updateEquipment(data) {
  return request({
    url : '/base/v1/equipment/updateEquipment',
    method : 'put',
    data : JSON.stringify(data)
  })
}

export function findEquipmentById(id) {
  return request({
    url : '/base/v1/equipment/findEquipmentById',
    method : 'get',
    params : {
      id : id
    }
  })
}

export function deleteEquipment(id) {
  return request({
    url : '/base/v1/equipment/deleteEquipment',
    method : 'delete',
    params : {
      id : id
    }
  })
}

export function pageEquipmentByParam(param, orgId, pageSize, pageIndex) {
  return request({
    url : '/base/v1/equipment/pageEquipmentByParam',
    method : 'get',
    params : {
      param : param,
      orgId : orgId,
      size : pageSize,
      current : pageIndex
    }
  })
}

export function listEquipmentByParam(param, orgId) {
  return request({
    url : '/base/v1/equipment/listEquipmentByParam',
    method : 'get',
    params : {
      param : param,
      orgId : orgId
    }
  })
}
