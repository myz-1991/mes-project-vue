import request from '@/utils/request'

export function saveRole(data){
  return request({
      url : '/system/v1/role/saveRole',
      method : 'post',
      data : JSON.stringify(data)
    })
}
export function updateRole(data){
  return request({
      url : '/system/v1/role/updateRole',
      method : 'put',
      data : JSON.stringify(data)
    })
}
export function findRoleById(roleId){
  return request({
      url : '/system/v1/role/findRoleById',
      method : 'get',
      params : {
        roleId : roleId
      }
    })
}
export function deleteRoleById(roleId){
  return request({
      url : '/system/v1/role/deleteRoleById',
      method : 'delete',
      params : {
        roleId : roleId
      }
    })
}
export function findRolePageByParam(param, size, current){
  return request({
      url : '/system/v1/role/findRolePageByParam',
      method : 'get',
      params : {
        param : param,
        size : size,
        current : current
      }
    })
}

export function getRoleList(param) {
  return request({
    url : '/system/v1/role/findRoleListByParam',
    method : 'get',
    params : {
      param : param
    }
  })
}

export function saveRoleResourceRelation(data) {
  return request({
    url : '/system/v1/relation/saveRoleResourceRelation',
    method : 'post',
    data : JSON.stringify(data)
  })
}

export function findRoleResourceRelationByRoleId(roleId) {
  return request({
    url : '/system/v1/relation/findRoleResourceRelationByRoleId',
    method : 'get',
    params : {
      roleId : roleId
    }
  })
}