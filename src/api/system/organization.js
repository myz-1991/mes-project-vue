import request from '@/utils/request'

export function saveOrganization(data) {
  return request({
    url: '/system/v1/organization/saveOrganization',
    method: 'post',
    data: JSON.stringify(data)
  })
}

export function findOrganizationById(id) {
  return request({
    url : '/system/v1/organization/findOrganizationById',
    method : 'get',
    params : {
      id : id
    }
  })
}

export function updateOrganization(data) {
  return request({
    url : '/system/v1/organization/updateOrganization',
    method : 'put',
    data: JSON.stringify(data)
  })
}

export function deleteOrganization(data) {
  data.leaf = 0
  return request({
    url : '/system/v1/organization/deleteOrganizationById',
    method : 'delete',
    data: JSON.stringify(data)
  })
}

export function findOrganizationTree(pid, param) {
  return request({
    url: '/system/v1/organization/findOrganizationTreeByParam',
    method: 'get',
    params: {
      pid: pid,
      param: param
    }
  })
}
