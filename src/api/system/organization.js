import request from '@/utils/request'

export function saveOrganization(data) {
  debugger
	return request({
		url: '/system/v1/organization/saveOrganization',
		method: 'post',
		data : JSON.stringify(data)
	})
}

export function findOrganizationTree(pid, param) {
  return request({
    url : '/system/v1/organization/findOrganizationTreeByParam',
    method : 'get',
    params : {
      pid : pid,
      param : param
    }
  })
}