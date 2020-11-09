import request from '@/utils/request'

export function saveProcessVersion(data) {
  return request({
    url : '/bom/v1/version/saveProcessVersion',
    method : 'post',
    data : JSON.stringify(data)
  })
}

export function updateProcessVersion(data) {
  return request({
    url : '/bom/v1/version/updateProcessVersion',
    method : 'put',
    data : JSON.stringify(data)
  })
}

export function findProcessVersionByIdd(id) {
  return request({
    url : '/bom/v1/version/findProcessVersionById',
    method : 'get',
    params : {
      id : id
    }
  })
}

export function findProcessVersionPage(param, size, pageIndex) {
  return request({
    url: '/bom/v1/version/findProcessVersionPage',
    method: 'get',
    params : {
		param : param,
		size : size,
		current : pageIndex
	}
  })
}

export function findProcessVersionList(param) {
  return request({
    url: '/bom/v1/version/findProcessVersionList',
    method: 'get',
    params : {
		param : param
	}
  })
}
